import getQualityMultiplicator from "./getQualityMultiplicator";

import Buildings from "../Models/Buildings";

export default async function getTuningTime(new_component_level: number, fast_tuning: boolean = false, quality: number = 3, user_id: string): Promise<number> {
    const tuning_time = 12000 * new_component_level;
    const tuningMultiplicator = getQualityMultiplicator(quality);
    const tuning_total_time = fast_tuning ? ((tuning_time + tuning_time * .1) * 0.8) * tuningMultiplicator : (tuning_time + tuning_time * .1) * tuningMultiplicator;

    const buildingResponse = await Buildings.findOne({ user_id });
    if (buildingResponse) {
        const werkstatt_level = buildingResponse.buildings.find((building) => building.buildingName === 'Werkstatt')?.buildingLevel;
        if (werkstatt_level) return tuning_total_time * (1 - .01 * werkstatt_level);
    }
    
    return tuning_total_time;
}