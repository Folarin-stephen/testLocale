"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const create = joi_1.default.object({
    _id: joi_1.default.number().required(),
    geopolitical_zone: joi_1.default.string().required(),
    states: joi_1.default.array().items(joi_1.default.object({
        name: joi_1.default.string().required(),
        capital: joi_1.default.string().required(),
    })),
    history: joi_1.default.object({
        pre_colonial_era: joi_1.default.string(),
        colonial_era: joi_1.default.string(),
        post_independence: joi_1.default.string(),
        civil_war: joi_1.default.string(),
        militancy_and_resource_control_agitations: joi_1.default.string(),
        development_challenges: joi_1.default.string(),
        political_influence: joi_1.default.string(),
        economic_contribution: joi_1.default.string(),
        population: joi_1.default.string()
    }),
    language_Spoken: joi_1.default.string().required(),
});
exports.default = { create };
