import { Answer } from '../../models/answer.model.js';
import { Result } from '../../models/result.model.js';
import { Student } from '../../models/student.model.js';
import { resultValidation } from '../../validations/result.validation.js';

export const addResult = async (req,res,next) => {
    try {
        const {answerId} = req.params;
        const {score} = req.body;
        const validationError = resultValidation({answerId, score});
        if(validationError) throw new CustomError(validationError, 400);
        let isPassed;
        if(score >= 60) {
            isPassed = true
        } else {
            isPassed = false;
            const answer = await Answer.findById(answerId);
            await Student.findByIdAndUpdate(answer.studentId, {$set: {isActive: false}});
        }
        const newResult = await Result.create({answerId, score, isPassed});
        res.status(201).json({message: 'Result was created'});
    } catch (error) {
        next(error)
    }
};

export const updateResult = async (req,res,next) => {
    try {
        const {resultId} = req.params;
        const {score} = req.body;
        await Result.findByIdAndUpdate(resultId, {$set: {score: score}});
        res.status(200).json({message: 'Result was successfully updated'});
    } catch (error) {
        next(error)
    }
};

export const getResults = async (_ ,res,next) => {
    try {
        const results = await Result.find().populate('answerId');
        res.status(200).json({message: 'List of results was formed', results});
    } catch (error) {
        next(error)
    }
};

export const getPassedResults = async (req,res,next) => {
    try {
        const results = await Result.find({isPassed: true}).populate('answerId');
        res.status(200).json({message: 'List of passed results was formed', results});
    } catch (error) {
        next(error)
    }
};