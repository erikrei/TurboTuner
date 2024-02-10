import axios from "axios";
import { TBuildingInformation } from "../../../types";

import { useUserInfo } from "../../../Contexts/UserInfoContext";
import { useBuildings } from "../../../Contexts/BuildingsContext";

type BuildingsSingleEnhancementCancelButtonProps = {
  building: TBuildingInformation;
};

export default function BuildingsSingleEnhancementCancelButton({
  building,
}: BuildingsSingleEnhancementCancelButtonProps) {
  const { userInfo, setUserInfo } = useUserInfo();
  const { buildings, setBuildings } = useBuildings();

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
