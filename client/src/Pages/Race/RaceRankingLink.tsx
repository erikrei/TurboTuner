import { NavLink } from "react-router-dom";

import { TRaceTime } from "../../types";

type RaceRankingProps = {
  raceTime: TRaceTime;
};

export default function RaceRankingLink({ raceTime }: RaceRankingProps) {
  return (
    <NavLink to={`ranking?hours=${raceTime.hours}&minutes=${raceTime.minutes}`}>
      Letztes Ergebnis
    </NavLink>
  );
}
