import { Schema, model } from 'mongoose';
import { TGeneralCar } from '../types';

const GeneralCarSchema = new Schema<TGeneralCar>({
    name: {
        type: String,
        unique: true,
    },
    price: Number
}, { collection: 'generalCars' });

export default model<TGeneralCar>('GeneralCarSchema', GeneralCarSchema);