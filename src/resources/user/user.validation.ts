import Joi from 'joi';

const register = Joi.object({
   Full_Name: Joi.string().max(30).required(),

    email: Joi.string().email().required(),

    password: Joi.string().min(6).required(),

    role: Joi.string().required(),

    verify: Joi.boolean(),

    apiKey: Joi.string()
});

const login = Joi.object({
    email: Joi.string().required(),

    password: Joi.string().required(),
});

export default { register, login };