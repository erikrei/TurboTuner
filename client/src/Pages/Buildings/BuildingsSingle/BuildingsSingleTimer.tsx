import { useState, useEffect } from "react";
import { TBuildingInformation } from "../../../types";

import getTimeStringFromMilliseconds from "../../../Helpers/getTimeStringFromMilliseconds";
import updateBuildingLevel from "../../../Helpers/Buildings/updateBuildingLevel";

import { useBuildings } from "../../../Contexts/BuildingsContext";

type BuildingsSingleTimerProps = {
  building: TBuildingInformation;
};

export default function BuildingsSingleTimer({
  building,
}: BuildingsSingleTimerProps) {
  const [timer, setTimer] = useState<number | null>(null);
  const { buildings, setBuildings } = useBuildings();

  useEffect(() => {
    const enhancementCountdown = setInterval(() => {
      if (building.buildingImprovement) {
        const now = new Date().getTime();
        const endTime = building.buildingImprovement.buildingImprovementEnd;
        const remainingEnhancementTime = endTime - now;
        setTimer(remainingEnhancementTime);

        if (remainingEnhancementTime < 0) {
          updateBuildingLevel(building, buildings, setBuildings);
        }
      }
    }, 1000);

    return () => clearInterval(enhancementCountdown);
  }, []);

  return (
    <div className="single-building-timer">
      <span className="timer-label">Restdauer</span>
      {timer ? (
        <span className="timer">{getTimeStringFromMilliseconds(timer)}</span>
      ) : (
        <span>wird geladen...</span>
      )}
    </div>
  );
}
