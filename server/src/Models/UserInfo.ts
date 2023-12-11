import { Schema, model } from 'mongoose';
import { TUserInfo } from '../types';

const UserInfoSchema = new Schema<TUserInfo>({
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
