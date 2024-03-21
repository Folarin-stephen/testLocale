"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createState = joi_1.default.object({
    _id: joi_1.default.number().required(),
    geopolitical_zone: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    localGovernments: joi_1.default.array().items(joi_1.default.object({
        lname: joi_1.default.string().required()
    })),
    overview: joi_1.default.object({
        capital: joi_1.default.string(),
        population: joi_1.default.string(),
        location: joi_1.default.string(),
        economy: joi_1.default.string(),
        tourism: joi_1.default.string(),
        transportation: joi_1.default.string(),
        culture: joi_1.default.string(),
        religion: joi_1.default.string(),
    }),
    language_Spoken: joi_1.default.string().required(),
});
exports.default = { createState };
