import { Schema, model, Mongoose} from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

import {IRegion} from '@/resources/region/region.interface';



const RegionSchema = new Schema(
    {
        _id: {
            type: Number,
            required: true,
        },
        geopolitical_zone: {
            type: String,
            required: true,
        },
        states: [{
            name: { type: String, required: true },
            capital: { type: String, required: true }
        }],
        history: {
            pre_colonial_era: String,
            colonial_era: String,
            post_independence: String,
            civil_war: String,
            militancy_and_resource_control_agitations: String,
            development_challenges: String,
            political_influence: String,
            economic_contribution: String,
            population: String
        },
        language_Spoken: {
            type: String,
        },
        
    },
    { timestamps: true }
);

// RegionSchema.plugin(autoIncrement.plugin, {
//     model: 'Region',
//     field: '_id', // The field you want to auto-increment
//     startAt: 1, // The initial value for the auto-increment
//     incrementBy: 1 // The increment step
// });

export default model<IRegion>('Region', RegionSchema);

// const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// // Initialize auto-increment plugin
// autoIncrement.initialize(mongoose.connection);

// Define your schema
// const Schema = mongoose.Schema;

// const YourSchema = new Schema({
//     // Other fields
// });

// Apply auto-increment to your schema's _id field
// YourSchema.plugin(autoIncrement.plugin, {
//     model: 'YourModel',
//     field: '_id', // The field you want to auto-increment
//     startAt: 1, // The initial value for the auto-increment
//     incrementBy: 1 // The increment step
// });

// Create the model
// const YourModel = mongoose.model('YourModel', YourSchema);

// Now you can use YourModel to interact with MongoDB