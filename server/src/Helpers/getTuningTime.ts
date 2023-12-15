export default function getTuningTime(tuning_start: number, new_component_level: number): number {
    const tuning_time = 12000 * new_component_level;
    return tuning_start + (tuning_time + tuning_time * .1);
}