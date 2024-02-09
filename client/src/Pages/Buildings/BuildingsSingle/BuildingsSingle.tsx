import { TBuildingInformation } from "../../../types";

import BuildingsSingleText from "./BuildingsSingleText";
import BuildingsSingleImage from "./BuildingsSingleImage";
import BuildingsSingleTimer from "./BuildingsSingleCheckEnhancement";

type BuildingsSingleProps = {
  building: TBuildingInformation;
  setBuildings: React.Dispatch<React.SetStateAction<TBuildingInformation[]>>;
  buildings: TBuildingInformation[];
};

export default function BuildingsSingle({
  building,
  setBuildings,
  buildings,
}: BuildingsSingleProps) {
  return (
    <div className="single-building">
      <div className="single-building-information">
        <BuildingsSingleText
          building={building}
          setBuildings={setBuildings}
          buildings={buildings}
        />
        <BuildingsSingleImage imgName={building.buildingName} />
      </div>
      <BuildingsSingleTimer
        building={building}
        buildings={buildings}
        setBuildings={setBuildings}
      />
    </div>
  );
}
