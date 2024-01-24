import { Schema, model } from 'mongoose';
import { TSavedRace } from '../types';

const SavedRaceSchema = new Schema<TSavedRace>({
    race_ranking: {
        users: [{
            ranking: Number,
            username: String,
            winnings: Number,
            claimedWinnings: Boolean,
            carTime: String
        }]
    },
    race_time: Number
}, { collection: 'SavedRaces' })

export default model<TSavedRace>('RaceSavedSchema', SavedRaceSchema);