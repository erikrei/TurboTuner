import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

import { TSavedRace } from "../../../types";

import BasicLoadingContainer from "../../../Components/BasicLoadingContainer";
import DashboardRennergebnisHeader from "./DashboardRennergebnisHeader";
import DashboardRennergebnisContent from "./DashboardRennergebnisContent";

export default function DashboardRennergebnis() {
  const [rennergebnis, setRennergebnis] = useState<TSavedRace | null>(null);
  const [dbHasData, setDbHasData] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/savedrace/last", { withCredentials: true })
      .then(({ data }: { data: TSavedRace }) => setRennergebnis(data))
      .catch(({ response }: { response: AxiosError }) => {
        if (response.status === 404) {
          setDbHasData(false);
        }
      });
  }, []);

  if (!dbHasData) {
    return null;
  }

  if (!rennergebnis) {
    return (
      <BasicLoadingContainer
        loadingName="Letztes Rennergebnis"
        plural={false}
      />
    );
  }

  return (
    <article className="rennergebnis-container">
      <DashboardRennergebnisHeader
        race_time={rennergebnis.race_time}
        users={rennergebnis.race_ranking.users}
      />
      <DashboardRennergebnisContent users={rennergebnis.race_ranking.users} />
    </article>
  );
}
