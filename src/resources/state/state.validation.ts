import Joi from 'joi';

const create = Joi.object({
    _id: Joi.number().required(),

    geopolitical_zone: Joi.string().required(),

    states: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        capital: Joi.string().required(),
    })),

    history: Joi.object({
        pre_colonial_era: Joi.string(),
        colonial_era: Joi.string(),
        post_independence: Joi.string(),
        civil_war: Joi.string(),
        militancy_and_resource_control_agitations: Joi.string(),
        development_challenges: Joi.string(),
        political_influence: Joi.string(),
        economic_contribution: Joi.string(),
        population: Joi.string()
        }),

    language_Spoken: Joi.string().required(),
});

export default { create };