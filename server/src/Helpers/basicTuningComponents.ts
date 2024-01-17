import { TUserCarTuningComponents } from "../types";

import getTuningTime from '../Helpers/getTuningTime';
import getTuningCost from '../Helpers/getTuningCost';
import getTuningImprovement from "./getTuningImprovement";

const tuning_components_names = ["Motor", "Tank"];

export default function basicTuningComponents(quality: number = 3): TUserCarTuningComponents[] {
    const tuning_components: TUserCarTuningComponents[] = [];

    tuning_components_names.forEach((name) => {
        tuning_components.push({
            component_name: name,
            component_level: 1,
            tuning_cost: getTuningCost(2, quality),
            tuning_time: getTuningTime(2, false, quality),
            tuning_improvement: getTuningImprovement(name, 1, quality)
        })
    })

    return tuning_components;
}