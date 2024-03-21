import { Document } from 'mongoose';

interface ILocalGovernments {
    name: string;
}

interface IOverview {
    capital: string;
    population: string;
    location: string;
    economy: string;
    tourism: string;
    transportation: string;
    culture: string; 
    religion: string;
}

interface IState extends Document {
    _id: number;
    name: string;
    // geopolitical_zone: number;
    localGovernments: ILocalGovernments[];
    overview: IOverview;
    language_Spoken: string;


}

export  { ILocalGovernments, IOverview, IState }