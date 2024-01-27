import { Schema, model } from 'mongoose';
import { TScrapyardCarInformation } from '../types';

const ScrappedCarsSchema = new Schema<TScrapyardCarInformation>({
    scrapyardCar: {
        name: String,
        tuning_components: [{
            component_name: String,
            component_level: Number,
            tuning_cost: Number,
            tuning_time: Number,
            tuning_improvement: Number
        }]
    },
    scrapyardPrice: Number
}, { collection: 'ScrappedCars' });

export default model<TScrapyardCarInformation>('ScrappedCarsSchema', ScrappedCarsSchema);