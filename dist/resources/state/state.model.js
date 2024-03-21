"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StateSchema = new mongoose_1.Schema({
    _id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    geopolitical_zone: {
        type: String,
        required: true,
    },
    localGovernments: [{
            lname: { type: String, required: true }
        }],
    overview: {
        capital: String,
        population: String,
        location: String,
        economy: String,
        tourism: String,
        transportation: String,
        culture: String,
        religion: String
    },
    language_Spoken: {
        type: String,
        required: true
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('State', StateSchema);
