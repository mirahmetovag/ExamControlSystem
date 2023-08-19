import Joi from 'joi';

export const teacherValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(6).required()
    });

    const {error} = schema.validate(data);

    return error ? error.message : false;
};