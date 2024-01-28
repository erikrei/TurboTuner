import { Schema, model } from 'mongoose';
import { TSellingCar } from '../types';

const SellingCarsSchema = new Schema<TSellingCar>({
    name: String,
    user_id: String,
    tuning_components: [{
        component_name: String,
        component_level: Number,
        tuning_cost: Number,
        tuning_time: Number,
        tuning_improvement: Number
    }],
    bids: [{
        amount: Number,
        bid_user: String
    }],
    price: Number
}, { collection: 'SellingCars' });

export default model<TSellingCar>('SellingCarsSchema', SellingCarsSchema);