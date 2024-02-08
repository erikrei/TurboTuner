import { BUILDINGS_DESCRIPTIONS } from "../../../data/BUILDINGS_DESCRIPTIONS";
import { TBuildingInformation } from "../../../types";

import BuildingsSingleEnhancementInfo from "./BuildingsSingleEnhancementInfo";

type BuildingsSingleTextProps = {
  building: TBuildingInformation;
};

export default function BuildingsSingleText({
  building,
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
    </div>
  );
}
