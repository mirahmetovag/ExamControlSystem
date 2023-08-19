import { Exam } from '../../models/exam.model.js';
import { CustomError } from '../../utils/customError.js';
import { examValidation } from '../../validations/exam.validation.js';

export const addExam = async (req,res,next) => {
    try {
        const {name, deadline, classId} = req.body;
        const validationError = examValidation({name, deadline, classId});
        if(validationError) throw new CustomError(validationError, 400);
        const isExists = await Exam.findOne({name});
          if (isExists) throw new CustomError('This name of exam is already added', 409);
        const newExam = await Exam.create({ name, deadline, classId });
        return res.status(201).json({ message: 'Exam was successfully added', newExam});
    } catch (error) {
        next(error);
    }
};

export const deleteExam = async (req,res,next) => {
    try {
        const {examId} = req.params;
        await Exam.findByIdAndDelete(examId);
        res.status(200).json({message: 'Exam was successfully deleted'});
    } catch (error) {
        next(error);
    }
};

export const updateExam = async (req,res,next) => {
    try {
        const {examId} = req.params;
        const {name, deadline} = req.body;   
        await Exam.findByIdAndUpdate(examId, { $set: { name: name, deadline: deadline}});
        res.status(200).json({message: 'Exam was successfully updated'});
    } catch (error) {
        next(error);
    }
};

export const getExam = async (req,res,next) => {
    try {
        const {examId} = req.params;
        const findExam = await Exam.findById(examId).populate('classId');
        res.status(302).json({message: 'Exam was successfully found', findExam});
    } catch (error) {
        next(error);
    }
};