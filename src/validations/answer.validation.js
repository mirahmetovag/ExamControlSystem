import Joi from 'joi';

export const answerValidation = (data) => {
    const schema = Joi.object({
        classId: Joi.string().min(24).max(24).alphanum().required(),
        examId: Joi.string().min(24).max(24).alphanum().required(),
    });

    const {error} = schema.validate(data);

    return error ? error.message : false;
};