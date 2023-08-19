import { Answer } from '../../models/answer.model.js';
import { CustomError } from '../../utils/customError.js';
import { v4 as uuid} from 'uuid';
import path from 'path';
import fs from 'fs';
import { Exam } from '../../models/exam.model.js';
import { answerValidation } from '../../validations/answer.validation.js';

export const addAnswer = async (req,res,next) => {
    try {
        const {file} = req.files;
        const {classId, examId} = req.body;
        if(!file) throw new CustomError('You have not attached the file', 400);
        const validationError = answerValidation({classId, examId});
        if(validationError) throw new CustomError(validationError, 400);
        const exam = await Exam.findById(examId);
        const endDeadline = new Date(exam.createdAt).setHours(new Date(exam.createdAt).getHours() + Number(exam.deadline));
        if(new Date () > new Date(endDeadline)) throw new CustomError('Deadline ended', 403);
        const isExists = await Answer.find({classId: classId, examId: examId, studentId: req.student._id}) 
        if(isExists.length > 0) throw new CustomError('You already submitted you answer. You can update it', 401);
        const fileName = `${uuid()}${path.extname(file.name)}`;
        file.mv(process.cwd() + '/src/uploads/' + fileName);
        await Answer.create({file: fileName, studentId: req.student._id, classId, examId});
        res.status(201).json({message: 'Your answer was successfully submitted'});
    } catch (error) {
        next(error)
    }
};

export const updateAnswer = async (req,res,next) => {
    try {
        const file = req.files;
        const {answerId} = req.params;
        if(!file) throw new CustomError('You have not attached the file', 400);
        const findAnswer = await Answer.findById(answerId);
        const filePath = `./uploads/${findAnswer.file}`;
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }})
        const fileName = `${uuid()}${path.extname(file.name)}`;
        file.mv(process.cwd() + '/src/uploads' + fileName);
        await Answer.findByIdAndUpdate(answerId, {$set: { file: fileName }});
        res.status(200).json({message: 'You answer was successfully updated'});
    } catch (error) {
        next(error)
    }
};