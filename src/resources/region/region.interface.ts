import { Document } from 'mongoose';


interface State {
    name: string;
    capital: string
}

interface History {
    pre_colonial_era: string;
    colonial_era: string;
    post_independence: string;
    civil_war: string;
    militancy_and_resource_control_agitations: string;
    development_challenges: string;
    political_influence: string;
    economic_contribution: string;
    population: string;
}


interface Region extends Document {
    _id: number;
    geopolitical_zone: string;
    states: State[];
    history: History;
    language_Spoken: string;
}

export  { Region, History, State }