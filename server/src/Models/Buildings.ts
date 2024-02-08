import { Schema, model } from 'mongoose';

import { TBuildings } from '../types';

const BuildingsSchema = new Schema<TBuildings>({
    user_id: String,
    buildings: [{
        buildingName: String,
        buildingLevel: Number,
        buildingMaximumLevel: Number,
        buildingLevelUpCost: Number,
        buildingLevelUpTime: Number,
        buildingImprovement: {
            type: {
                buildingNextLevel: Number,
                buildingImprovementStart: Number,
                buildingImprovementEnd: Number
            },
            required: false
        }
    }]
}, { collection: 'Buildings' })

export default model<TBuildings>('BuildingsSchema', BuildingsSchema)