import Joi from 'joi';

export const resultValidation = (data) => {
    const schema = Joi.object({
        answerId: Joi.string().min(24).max(24).alphanum().required(),
        score: Joi.number().required()
    });

    const {error} = schema.validate(data);

    return error ? error.message : false;
};