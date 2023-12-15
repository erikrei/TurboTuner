export default function getTuningCost(component_name: string, new_component_level: number): number {
    const cost = 4000 * new_component_level;
    return cost + (cost * .1);
}