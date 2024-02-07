import { useLoaderData } from "react-router-dom";
import { AxiosResponse } from "axios";

import { TBuildings } from "../../types";

import BuildingsSingle from "./BuildingsSingle/BuildingsSingle";

export default function BuildingsAll() {
  const loaderData = useLoaderData() as AxiosResponse;
  const buildingsData: TBuildings = loaderData.data;
  const buildings = buildingsData.buildings;

  return (
    <div className="buildings-container">
      {buildings.map((building) => (
        <BuildingsSingle key={building._id} building={building} />
      ))}
    </div>
  );
}
