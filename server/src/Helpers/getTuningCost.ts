import getQualityMultiplicator from "./getQualityMultiplicator";

export default function getTuningCost(new_component_level: number, quality: number = 3): number {
    const cost = 4000 * new_component_level;
    const qualityMultiplicator = getQualityMultiplicator(quality);
    return (cost + (cost * .1)) * qualityMultiplicator;
}