import axios from "axios";
import { TBuildingInformation } from "../../../types";

import { useUserInfo } from "../../../Contexts/UserInfoContext";

type BuildingsSingleEnhancementCancelButtonProps = {
  building: TBuildingInformation;
  setBuildings: React.Dispatch<React.SetStateAction<TBuildingInformation[]>>;
  buildings: TBuildingInformation[];
};

export default function BuildingsSingleEnhancementCancelButton({
  building,
  setBuildings,
  buildings,
}: BuildingsSingleEnhancementCancelButtonProps) {
  const { userInfo, setUserInfo } = useUserInfo();

  function handleEnhancementCancelClick() {
    axios
      .put(
        "http://localhost:3000/buildings/improvement/cancel",
        {
          buildingName: building.buildingName,
        },
        { withCredentials: true }
      )
      .then(({ data }: { data: TBuildingInformation }) => {
        const newBuildingData = buildings.map((mapBuilding) => {
          if (mapBuilding._id === building._id) return data;
          else return mapBuilding;
        });
        setBuildings(newBuildingData);
        userInfo &&
          setUserInfo({
            ...userInfo,
            money: userInfo.money + data.buildingLevelUpCost,
          });
      });
  }

  return (
    <button onClick={handleEnhancementCancelClick}>
      Verbesserung von {building.buildingName} abbrechen
    </button>
  );
}
