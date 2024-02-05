import { Schema, model } from 'mongoose';

import { TBuildings } from '../types';

const BuildingsSchema = new Schema<TBuildings>({
    user_id: String,
    buildings: [{
        buildingName: String,
        buildingLevel: Number,
        buildingImprovement: {
            type: [{
                buildingNextLevel: Number,
                buildingNextLevelCost: Number,
                buildingNextLevelTime: Number
            }],
            required: false
        }
    }]
}, { collection: 'Buildings' })

export default model<TBuildings>('BuildingsSchema', BuildingsSchema)