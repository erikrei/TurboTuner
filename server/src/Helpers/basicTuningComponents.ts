import { TUserCarTuningComponents } from "../types";

import getTuningTime from '../Helpers/getTuningTime';
import getTuningCost from '../Helpers/getTuningCost';
import getTuningImprovement from "./getTuningImprovement";

const tuning_components_names = ["Motor", "Tank"];

export default async function basicTuningComponents(quality: number = 3, user_id: string): Promise<TUserCarTuningComponents[]> {
    const tuning_components: TUserCarTuningComponents[] = [];

    const tuning_time = await getTuningTime(2, false, quality, user_id);

    tuning_components_names.forEach((name) => {
        tuning_components.push({
            component_name: name,
            component_level: 1,
            tuning_cost: getTuningCost(2, quality),
            tuning_time,
            tuning_improvement: getTuningImprovement(name, 1, quality)
        })
    })

    return tuning_components;
}