import { TBuildingInformation } from "../../../types";
import axios from "axios";

import { useUserInfo } from "../../../Contexts/UserInfoContext";
import { useBuildings } from "../../../Contexts/BuildingsContext";

type BuildingsSingleEnhancementButtonProps = {
  building: TBuildingInformation;
};

export default function BuildingsSingleEnhancementButton({
  building,
}: BuildingsSingleEnhancementButtonProps) {
  const { userInfo, setUserInfo } = useUserInfo();
  const { buildings, setBuildings } = useBuildings();

  let disableEnhancementButton = true;

  if (!building.buildingImprovement) disableEnhancementButton = false;

  if (userInfo) {
    if (userInfo.money < building.buildingLevelUpCost)
      disableEnhancementButton = true;
  }

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
        userInfo &&
          setUserInfo({
            ...userInfo,
            money: userInfo.money - data.buildingLevelUpCost,
          });
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
