import { TBuildingInformation } from "../../../types";

import getTimeStringFromMilliseconds from "../../../Helpers/getTimeStringFromMilliseconds";

type BuildingsSingleEnhancementInfoProps = {
  building: TBuildingInformation;
};

export default function BuildingsSingleEnhancementInfo({
  building,
}: BuildingsSingleEnhancementInfoProps) {
  const timeString = getTimeStringFromMilliseconds(
    building.buildingLevelUpTime
  );

  return (
    <div className="building-enhancement-container">
      <p>Verbesserungskosten: {building.buildingLevelUpCost} €</p>
      <p>Verbesserungszeit: {timeString}</p>
    </div>
  );
}
