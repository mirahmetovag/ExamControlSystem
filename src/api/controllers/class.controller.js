import { Class } from '../../models/class.model.js';
import { CustomError } from '../../utils/customError.js';
import { classValidation } from '../../validations/class.validation.js';

export const addClass = async (req,res,next) => {
    try {
        const {name} = req.body;
        const validationError = classValidation({name});
        if(validationError) throw new CustomError(validationError, 400);
        const isExists = await Class.findOne({name});
          if (isExists) throw new CustomError ('This class is already added', 409);
        const newClass = await Class.create({ name });
        return res.status(201).json({ message: 'Class was successfully added', newClass});
    } catch (error) {
        next(error)
    }
};

export const deleteClass = async (req,res,next) => {
    try {
        const {classId} = req.params;
        await Class.findByIdAndDelete(classId);
        res.status(200).json({message: 'Class was successfully deleted'});
    } catch (error) {
        next(error)
    }
};

export const updateClass = async (req,res,next) => {
    try {
        const {classId} = req.params;
        const {name} = req.body;   
        await Class.findByIdAndUpdate(classId, { $set: { name: name}});
        res.status(200).json({message: 'Class was successfully updated'});
    } catch (error) {
        next(error)
    }
};

export const getClass = async (req,res,next) => {
    try {
        const {classId} = req.params;
        const findClass = await Class.findById(classId);
        res.status(302).json({message: 'Class was successfully found', findClass});
    } catch (error) {
        next(error)
    }
};