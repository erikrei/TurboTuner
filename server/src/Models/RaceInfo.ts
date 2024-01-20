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
    },
    race_ranking: {
        required: false,
        type: {
            users: [{
                ranking: Number,
                username: String,
                winnings: Number,
                claimedWinnings: Boolean,
                carTime: String
            }]
        }
    }
}, { collection: 'races' })

export default model<TRaceInformation>('RaceInfoSchema', RaceInfoSchema);