import { Schema, model, Mongoose} from 'mongoose';

import { IRegion } from '@/resources/region/region.interface'

import  Region  from '@/resources/region/region.model'

import { IState } from '@/resources/state/state.interface'




const StateSchema = new Schema(
    {
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
        
    },
    { timestamps: true }
);

export default model<IState>('State', StateSchema);
