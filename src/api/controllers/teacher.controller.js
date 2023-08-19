import config from 'config';
import { redis } from '../../app.js';
import { Teacher } from '../../models/teacher.model.js';
import { hashPass, comparePass } from '../../utils/bcrypt.js';
import { sign } from '../../utils/jwt.js';
import nodemailer from 'nodemailer';
import { Student } from '../../models/student.model.js';
import { Class } from '../../models/class.model.js';
import { CustomError } from '../../utils/customError.js';
import { teacherValidation } from '../../validations/teacher.validation.js';

const teacherEmail = config.get('TEACHER_EMAIL');

export const teacherRegister = async (req,res,next) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      const validationError = teacherValidation ({firstName, lastName, email, password});
      if(validationError) throw new CustomError(validationError, 400);

      console.log(req.body);

      if(email !== teacherEmail) throw new CustomError('This email is not allowed to be used', 403);
  
      const isExists = await Teacher.findOne({email});

      if (isExists && isExists.isActive === true) throw new CustomError ('You are already registered', 409);
       
      const code = Math.ceil(Math.random() * 1000000);
      redis.set(email, code, 'EX', 300);
      
      const transporter = nodemailer.createTransport({
          port: 465,
          host: 'smtp.gmail.com',
          auth: {
              user: "nasirullayevo7@gmail.com",
              pass: "smenmggcgonbqmwl",
            },
            secure: true,
        });
        
        const mailData = {
            from: "nasirullayevo7@gmail.com",
            to: email,
            subject: 'Registration',
            text: 'Verify your registration by using following code',
            html: `<b>Your code:</b><br>${code}<br/>`,
        };
        await transporter.sendMail(mailData);

      if(!isExists) {
      let hashedPass = await hashPass(password, 10);
      const newTeacher = await Teacher.create({ firstName, lastName, email, password: hashedPass });
      return res.status(201).json({ message: 'Successfully registered. Please confirm it via email', newTeacher});
      } else {
        res.status(200).json({message: 'Code was sent again. Please confirm your email'});
      }
    } catch (error) {
      next(error);
    }
};

export const teacherRegisterVerification = async (req,res,next) => { 
    try {
        const {email, code} = req.body;
        console.log(req.body);
        const validationError = await redis.get(email);
        if (validationError != code) throw new CustomError('Invalid code or email', 400);
        await Teacher.findOneAndUpdate({email: email}, {$set: {isActive: true}});
        return res.status(200).json({ message: 'Successfully confirmed'});       
    } catch (error) {
        next(error)
    }
};

export const teacherLogin = async (req,res,next) => {
    try {
        const { email, password } = req.body;
        const findTeacher = await Teacher.findOne({ email });
        if(!findTeacher) throw new CustomError ('Invalid email or password', 401);
        if(!findTeacher.isActive) throw new CustomError('You have not verified your email', 409);
        const isPass = await comparePass(password.toString(), findTeacher.password);
    
        if(!isPass) throw new CustomError ('Invalid email or password', 401);
        const token = sign({payload: findTeacher._id});
        res.cookie('token',token);
        return res.status(200).json({ message: 'Successfully logged in'});
    } catch (error) {
        next(error)
    }
};

export const teacherLogout = async ( _ ,res) => {
    res.cookie('token', '');
    res.status(200).json({message: 'You are successfully logged out'});
};

export const getTeachersClasses = async (req,res,next) => {
    try {
        const classes = await Class.find();
        res.status(200).json({message: 'The list of your classes was formed', classes});
    } catch (error) {
        next(error)
    }
};

export const getTeachersStudents = async (req,res,next) => {
    try {
        const students = await Student.find();
        res.status(200).json({message: 'The list of your students was formed', students});
    } catch (error) {
        next(error)
    }
};