import { TBuildingImprovement } from "../../types";

export default function calculateBuildingInformation(buildingName: string, buildingLevel: number): TBuildingImprovement | undefined {
    const improvementData = BUILDINGS_IMPROVEMENT_DATA.find((building) => building.buildingName === buildingName);
    const msNow = new Date().getTime();

    if (improvementData) {
        return {
            buildingNextLevel: buildingLevel + 1,
            buildingImprovementStart: msNow,
            buildingImprovementEnd: msNow + (improvementData.buildingBaseTime * buildingLevel),
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
