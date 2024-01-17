import getQualityMultiplicator from "./getQualityMultiplicator";

export default function getTuningTime(new_component_level: number, fast_tuning: boolean = false, quality: number = 3): number {
    const tuning_time = 12000 * new_component_level;
    const tuningMultiplicator = getQualityMultiplicator(quality);
    return fast_tuning ? ((tuning_time + tuning_time * .1) * 0.8) * tuningMultiplicator : (tuning_time + tuning_time * .1) * tuningMultiplicator
}