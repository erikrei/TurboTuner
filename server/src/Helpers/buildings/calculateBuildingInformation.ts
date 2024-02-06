import { TBuildingImprovement } from "../../types";

export default function calculateBuildingInformation(buildingName: string, buildingLevel: number): TBuildingImprovement | undefined {
    const improvementData = BUILDINGS_IMPROVEMENT_DATA.find((building) => building.buildingName === buildingName);

    if (improvementData) {
        return {
            buildingNextLevel: buildingLevel + 1,
            buildingNextLevelTime: improvementData.buildingBaseTime * buildingLevel,
            buildingNextLevelCost: improvementData.buildingBaseCost * buildingLevel
        }
    }

    return undefined;
}

export type TBuildingImprovementData = {
    buildingName: string,
    buildingBaseTime: number,
    buildingBaseCost: number
}

export const BUILDINGS_IMPROVEMENT_DATA: TBuildingImprovementData[] = [
    {
        buildingName: 'Werkstatt',
        buildingBaseTime: 180000,
        buildingBaseCost: 15000
    }
]
