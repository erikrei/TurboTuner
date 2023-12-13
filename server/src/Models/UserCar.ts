import { Schema, model } from 'mongoose';
import { TUserCar } from '../types';

const UserCarSchema = new Schema<TUserCar>({
    name: String,
    user_id: String
}, { collection: 'usersCars' });

export default model<TUserCar>('UserCarSchema', UserCarSchema);