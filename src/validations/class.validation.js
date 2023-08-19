import Joi from 'joi';

export const classValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required()
    });

    const {error} = schema.validate(data);

    return error ? error.message : false;
};