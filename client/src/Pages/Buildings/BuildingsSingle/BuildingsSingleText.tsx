import { BUILDINGS_DESCRIPTIONS } from "../../../data/BUILDINGS_DESCRIPTIONS";
import { TBuildingInformation } from "../../../types";

import BuildingsSingleEnhancementInfo from "./BuildingsSingleEnhancementInfo";
import BuildingsSingleEnhancementButton from "./BuildingsSingleEnhancementButton";

type BuildingsSingleTextProps = {
  building: TBuildingInformation;
  setBuildings: React.Dispatch<React.SetStateAction<TBuildingInformation[]>>;
  buildings: TBuildingInformation[];
};

export default function BuildingsSingleText({
  building,
  setBuildings,
  buildings,
}: BuildingsSingleTextProps) {
  const description = BUILDINGS_DESCRIPTIONS.find(
    (building) => building.buildingName === building.buildingName
  )?.buildingDescription;

  return (
    <div className="building-text">
      <h3 className="building-header">
        {building.buildingName}
        <span className="building-level">
          {building.buildingLevel}/{building.buildingMaximumLevel}
        </span>
      </h3>
      <BuildingsSingleEnhancementInfo building={building} />
      <p className="building-description">{description}</p>
      <BuildingsSingleEnhancementButton
        building={building}
        setBuildings={setBuildings}
        buildings={buildings}
      />
    </div>
  );
}
