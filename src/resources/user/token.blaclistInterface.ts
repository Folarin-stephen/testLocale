import { Document } from 'mongoose';

export default interface Blaclist extends Document {
    token: string;
}