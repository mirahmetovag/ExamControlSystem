import { Student } from '../../models/student.model.js';
import { comparePass, hashPass } from '../../utils/bcrypt.js';
import { CustomError } from '../../utils/customError.js';
import { sign } from '../../utils/jwt.js';
import { studentValidation } from '../../validations/student.validation.js';

export const studentLogin = async (req,res,next) => {
    try {
        const { email, password } = req.body;
        const findStudent = await Student.findOne({ email });
        if(!findStudent) throw new CustomError ('Invalid email or password', 401);
        const isPass = await comparePass(password, findStudent.password);
        if(!isPass) throw new CustomError ('Invalid email or password', 401);

        const token = sign({payload: findStudent._id});
        res.cookie('token',token);
        return res.status(200).json({ message: 'Successfully logged in'});
    
    } catch (error) {
        next(error);
    }
};

export const addStudent = async (req,res,next) => {
    try {
        const {firstName, lastName, email, password, classId} = req.body;
        const validationError = studentValidation({firstName, lastName, email, password, classId});
        if(validationError) throw new CustomError(validationError, 400);
        const isExists = await Student.findOne({email});
          if (isExists) throw new CustomError ('This student was already added', 409);
        let hashedPass = await hashPass(password, 10);
        await Student.create({ firstName, lastName, email, password: hashedPass, classId });
        return res.status(201).json({ message: 'Student was successfully registered'});
    } catch (error) {
        next(error)
    }
};

export const deleteStudent = async (req,res,next) => {
    try {
        const {studentId} = req.params;
        console.log(studentId);
        await Student.findByIdAndDelete(studentId);
        res.status(200).json({message: 'Student was successfully deleted'});
    } catch (error) {
        next(error)
    }
};

export const updateStudent = async (req,res,next) => {
    try {
        const {studentId} = req.params;
        const {firstName, lastName, email, classId} = req.body;   
        await Student.findByIdAndUpdate(studentId, { $set: { firstName: firstName, lastName: lastName, email: email, classId: classId }});
        res.status(200).json({message: 'Student was successfully updated'});
    } catch (error) {
        next(error)
    }
};

export const updateStudentPass = async (req,res,next) => {
    try {
        const {password, newPassword} = req.body;
        const isPass = await comparePass(password, req.student.password);
        if(!isPass) throw new CustomError ('Invalid password', 401);
        await Student.findByIdAndUpdate(req.student._id, { $set: { password: newPassword }});
        res.status(200).json({message:'Password was successfully updated'});
    } catch (error) {
        next(error)
    }
};

export const getStudent = async (req,res,next) => {
    try {
        const {studentId} = req.params;
        const findStudent = await Student.findById(studentId).populate('classId');
        res.status(302).json({message: 'Student was successfully found', findStudent});
    } catch (error) {
        next(error)
    }
};