import { TBuildingInformation } from "../../../types";

import BuildingsSingleText from "./BuildingsSingleText";
import BuildingsSingleImage from "./BuildingsSingleImage";

type BuildingsSingleProps = {
  building: TBuildingInformation;
};

export default function BuildingsSingle({ building }: BuildingsSingleProps) {
  return (
    <div className="single-building">
      <BuildingsSingleText building={building} />
      <BuildingsSingleImage imgName={building.buildingName} />
    </div>
  );
}
