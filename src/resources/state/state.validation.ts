import Joi from 'joi';

const createState = Joi.object({
    _id: Joi.number().required(),

    geopolitical_zone: Joi.string().required(),

    name:Joi.string().required(),

    localGovernments: Joi.array().items(Joi.object({
        lname: Joi.string().required()
    })),

    overview: Joi.object({
        capital: Joi.string(),
        population: Joi.string(),
        location: Joi.string(),
        economy: Joi.string(),
        tourism: Joi.string(),
        transportation: Joi.string(),
        culture: Joi.string(),
        religion: Joi.string(),
        }),

    language_Spoken: Joi.string().required(),
});

export default { createState };