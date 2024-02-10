import BuildingsSingle from "./BuildingsSingle/BuildingsSingle";

import { useBuildings } from "../../Contexts/BuildingsContext";

export default function BuildingsAll() {
  const { buildings } = useBuildings();

  return (
    <div className="buildings-container">
      {buildings.map((building) => (
        <BuildingsSingle key={building._id} building={building} />
      ))}
    </div>
  );
}
