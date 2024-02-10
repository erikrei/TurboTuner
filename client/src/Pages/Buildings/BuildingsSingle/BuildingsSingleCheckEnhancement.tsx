import { TBuildingInformation } from "../../../types";

import updateBuildingLevel from "../../../Helpers/Buildings/updateBuildingLevel";
import BuildingsSingleTimer from "./BuildingsSingleTimer";
import BuildingsSingleEnhancementCancelButton from "./BuildingsSingleEnhancementCancelButton";

import { useBuildings } from "../../../Contexts/BuildingsContext";

type BuildingsSingleCheckEnhancementProps = {
  building: TBuildingInformation;
};

export default function BuildingsSingleCheckEnhancement({
  building,
}: BuildingsSingleCheckEnhancementProps) {
  const { buildings, setBuildings } = useBuildings(); 

  if (!building.buildingImprovement) return null;

  if (building.buildingImprovement) {
    const now = new Date().getTime();
    const endTime = building.buildingImprovement.buildingImprovementEnd;

    if (now > endTime) {
      return updateBuildingLevel(building, buildings, setBuildings);
    }
  }

  return (
    <div className="single-building-improvement">
      <BuildingsSingleTimer
        building={building}
      />
      <BuildingsSingleEnhancementCancelButton
        building={building}
      />
    </div>
  );
}
