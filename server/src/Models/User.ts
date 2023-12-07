import { Schema, model } from 'mongoose';
import { TUser } from '../types';

const UserSchema = new Schema<TUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { collection: 'users' })

export default model<TUser>('UserSchema', UserSchema);
