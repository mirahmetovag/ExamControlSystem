import Joi from 'joi';

export const examValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        deadline: Joi.number().required(),
        classId: Joi.string().alphanum().min(24).max(24).required()
    });

    const {error} = schema.validate(data);

    return error ? error.message : false;
};