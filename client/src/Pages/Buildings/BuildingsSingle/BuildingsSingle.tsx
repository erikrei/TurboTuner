import { TBuildingInformation } from "../../../types";

import BuildingsSingleText from "./BuildingsSingleText";
import BuildingsSingleImage from "./BuildingsSingleImage";

type BuildingsSingleProps = {
  building: TBuildingInformation;
};

export default function BuildingsSingle({ building }: BuildingsSingleProps) {
  return (
    <div className="single-building">
      <BuildingsSingleText
        name={building.buildingName}
        level={building.buildingLevel}
      />
      <BuildingsSingleImage imgName={building.buildingName} />
    </div>
  );
}
