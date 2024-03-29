"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const register = joi_1.default.object({
    Full_Name: joi_1.default.string().max(30).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    role: joi_1.default.string().required(),
    verify: joi_1.default.boolean(),
    apiKey: joi_1.default.string()
});
const login = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.default = { register, login };
