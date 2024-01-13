export default function getTuningCost(new_component_level: number): number {
    const cost = 4000 * new_component_level;
    return cost + (cost * .1);
}