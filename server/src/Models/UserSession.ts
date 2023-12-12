import { Schema, model } from 'mongoose';

type TUserSession = {
    _id: string
}

const UserSessionSchema = new Schema<TUserSession>({
    _id: String
}, { collection: 'userSessions' });

export default model<TUserSession>('UserSessionSchema', UserSessionSchema);