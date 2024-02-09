import { TBuildingInformation } from "../../../types";

import updateBuildingLevel from "../../../Helpers/Buildings/updateBuildingLevel";
import BuildingsSingleTimer from "./BuildingsSingleTimer";
import BuildingsSingleEnhancementCancelButton from "./BuildingsSingleEnhancementCancelButton";

type BuildingsSingleCheckEnhancementProps = {
  building: TBuildingInformation;
  setBuildings: React.Dispatch<React.SetStateAction<TBuildingInformation[]>>;
  buildings: TBuildingInformation[];
};

export default function BuildingsSingleCheckEnhancement({
  building,
  setBuildings,
  buildings,
}: BuildingsSingleCheckEnhancementProps) {
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
        buildings={buildings}
        setBuildings={setBuildings}
      />
      <BuildingsSingleEnhancementCancelButton
        building={building}
        buildings={buildings}
        setBuildings={setBuildings}
      />
    </div>
  );
}
