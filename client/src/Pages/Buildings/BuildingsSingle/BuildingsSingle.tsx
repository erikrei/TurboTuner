import { TBuildingInformation } from "../../../types";

import BuildingsSingleText from "./BuildingsSingleText";
import BuildingsSingleImage from "./BuildingsSingleImage";
import BuildingsSingleTimer from "./BuildingsSingleCheckEnhancement";

type BuildingsSingleProps = {
  building: TBuildingInformation;
};

export default function BuildingsSingle({ building }: BuildingsSingleProps) {

  return (
    <div className="single-building">
      <div className="single-building-information">
        <BuildingsSingleText
          building={building}
        />
        <BuildingsSingleImage imgName={building.buildingName} />
      </div>
      <BuildingsSingleTimer
        building={building}
      />
    </div>
  );
}
