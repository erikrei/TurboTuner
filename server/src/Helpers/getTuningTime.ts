export default function getTuningTime(new_component_level: number, fast_tuning: boolean = false): number {
    const tuning_time = 12000 * new_component_level;
    return fast_tuning ? (tuning_time + tuning_time * .1) * 0.8 : tuning_time + tuning_time * .1;
}