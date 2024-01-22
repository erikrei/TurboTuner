import { useEffect, useState } from "react";
import axios from "axios";

import { TRaceRanking } from "../../types";

import { useSearchParams } from "react-router-dom";

import getTimeFormatted from "../../Helpers/getTimeFormatted";

import RaceRankingContainer from "./RaceRankingContainer";
import RaceRankingWinnings from "./RaceRankingWinnings";

export default function RaceRanking() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ranking, setRanking] = useState<null | TRaceRanking>(null);
  const hours = Number(searchParams.get("hours") || -1);
  const minutes = Number(searchParams.get("minutes") || -1);
  const timeFormatted = getTimeFormatted(hours, minutes);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/race/ranking/${hours}/${minutes}`, {
        withCredentials: true,
      })
      .then(({ data }: { data: TRaceRanking }) => setRanking(data));
  }, []);

  return (
    <>
      <h1 className="content-headline">
        Ranking <span>von {timeFormatted}</span>
      </h1>
      <section className="race-ranking-container tmp-bg">
        {ranking && (
          <RaceRankingWinnings
            users={ranking.users}
            setRanking={setRanking}
            hours={hours}
            minutes={minutes}
          />
        )}
        {ranking && <RaceRankingContainer ranking={ranking} />}
      </section>
    </>
  );
}
