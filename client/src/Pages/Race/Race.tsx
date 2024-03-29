import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import "../../styles/race.css";

import { TRaceInformation } from "../../types";
import { AxiosResponse } from "axios";

import RaceContainer from "./RaceContainer";

export default function Race() {
  const racesData = useLoaderData() as AxiosResponse;
  const [races, setRaces] = useState<TRaceInformation[]>(racesData.data);
  races.sort((a, b) => a.race_time.hours - b.race_time.hours);

  return (
    <>
      <h1 className="content-headline">Rennen</h1>
      <section className="races-container tmp-bg">
        {races.map((race) => (
          <RaceContainer key={race._id} race={race} setRaces={setRaces} />
        ))}
      </section>
    </>
  );
}
