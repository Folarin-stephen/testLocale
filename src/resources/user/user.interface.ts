import { Document } from 'mongoose';

export default interface User extends Document {
    email: string;
    Full_Name: string;
    password: string;
    role: string;
    verified: boolean;
    apikey: string;

    isValidPassword(password: string): Promise<Error | boolean>;
}