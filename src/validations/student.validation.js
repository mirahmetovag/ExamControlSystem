import Joi from 'joi';

export const studentValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(6).required(),
        classId: Joi.string().alphanum().min(24).max(24).required()
    });

    const {error} = schema.validate(data);

    return error ? error.message : false;
};