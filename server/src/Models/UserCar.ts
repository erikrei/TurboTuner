import { Schema, model } from 'mongoose';
import { TUserCar } from '../types';

const UserCarSchema = new Schema<TUserCar>({
    name: String,
    user_id: String,
    tuning_components: [{
        component_name: String,
        component_level: Number
    }],
    tuning_information: {
        type: {
            component_name: String,
            new_component_level: Number,
            tuning_start: Number,
            tuning_end: Number
        },
        required: false
    }
}, { collection: 'usersCars' });

export default model<TUserCar>('UserCarSchema', UserCarSchema);