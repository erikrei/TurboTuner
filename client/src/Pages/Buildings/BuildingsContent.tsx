import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { AxiosResponse } from "axios";

import { useBuildings } from "../../Contexts/BuildingsContext";

import { TBuildings } from "../../types";

import BuildingsAll from "./BuildingsAll";

export default function BuildingsContent() {
  const loaderData = useLoaderData() as AxiosResponse;
  const buildings: TBuildings = loaderData.data;

  const { setBuildings } = useBuildings();

  useEffect(() => {
    setBuildings(buildings.buildings);
  }, []);

  return (
    <section className="tmp-bg">
      <BuildingsAll />
    </section>
  );
}
