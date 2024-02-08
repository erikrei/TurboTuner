import { TBuildingInformation, TBuildingImprovement } from "../../../types";
import axios from "axios";

type BuildingsSingleEnhancementButtonProps = {
  building: TBuildingInformation;
  setBuildings: React.Dispatch<React.SetStateAction<TBuildingInformation[]>>;
  buildings: TBuildingInformation[];
};

export default function BuildingsSingleEnhancementButton({
  building,
  setBuildings,
  buildings,
}: BuildingsSingleEnhancementButtonProps) {
  let disableEnhancementButton = true;

  if (!building.buildingImprovement) disableEnhancementButton = false;

  function handleEnhancementBuildingClick() {
    axios
      .put(
        "http://localhost:3000/buildings/improvement/improve",
        {
          buildingName: building.buildingName,
        },
        { withCredentials: true }
      )
      .then(({ data }: { data: TBuildingInformation }) => {
        const updatedBuildings = buildings.map((mapBuilding) => {
          if (mapBuilding._id === building._id) {
            return data;
          } else {
            return mapBuilding;
          }
        });
        setBuildings(updatedBuildings);
      });
  }

  return (
    <button
      disabled={disableEnhancementButton}
      onClick={handleEnhancementBuildingClick}
    >
      {building.buildingName} verbessern
    </button>
  );
}
