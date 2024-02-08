import { TBuildingInformation } from "../../../types";

import BuildingsSingleText from "./BuildingsSingleText";
import BuildingsSingleImage from "./BuildingsSingleImage";

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
      <BuildingsSingleText
        building={building}
        setBuildings={setBuildings}
        buildings={buildings}
      />
      <BuildingsSingleImage imgName={building.buildingName} />
    </div>
  );
}
