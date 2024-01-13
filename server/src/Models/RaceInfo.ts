import { Schema, model } from 'mongoose';
import { TRaceUser, TRaceInformation } from '../types';

const RaceInfoSchema = new Schema<TRaceInformation>({
    users: [{
        username: String,
        user_id: String
    }],
    race_time: {
        hours: Number,
        minutes: Number
    }
}, { collection: 'races' })

export default model<TRaceInformation>('RaceInfoSchema', RaceInfoSchema);