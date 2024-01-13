import { TUserCarTuningComponents } from "../types";

import getTuningTime from '../Helpers/getTuningTime';
import getTuningCost from '../Helpers/getTuningCost';

const tuning_components_names = ["Motor", "Tank"];

export default function basicTuningComponents(): TUserCarTuningComponents[] {
    const tuning_components: TUserCarTuningComponents[] = [];

    tuning_components_names.forEach((name) => {
        tuning_components.push({
            component_name: name,
            component_level: 1,
            tuning_cost: getTuningCost(2),
            tuning_time: getTuningTime(2)
        })
    })

    return tuning_components;
}