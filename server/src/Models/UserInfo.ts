import { Schema, model } from 'mongoose';
import { TUserInfo } from '../types';

const UserInfoSchema = new Schema<TUserInfo>({
    username: {
        type: String,
        required: true,
    },
    money: {
        type: Number,
        required: true,
    },
    points: {
        type: Number,
        required: true
    }
}, { collection: 'userInfos' })

export default model<TUserInfo>('UserInfoSchema', UserInfoSchema);
