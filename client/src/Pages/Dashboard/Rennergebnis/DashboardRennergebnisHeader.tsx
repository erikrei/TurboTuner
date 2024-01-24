import { TRaceRankingUser } from "../../../types";

import DashboardRennergebnisHeaderText from "./DashboardRennergebnisHeaderText";
import DashboardRennergebnisLink from "./DashboardRennergebnisLink";

type DashboardRennergebnisHeaderProps = {
  race_time: number;
  users: TRaceRankingUser[];
};

export default function DashboardRennergebnisHeader({
  race_time,
  users,
}: DashboardRennergebnisHeaderProps) {
  const raceDate = new Date(race_time);
  const raceDateHours = raceDate.getHours();
  const raceDateMinutes = raceDate.getMinutes();

  return (
    <div className="rennergebnis-header">
      <DashboardRennergebnisHeaderText
        hours={raceDateHours}
        minutes={raceDateMinutes}
      />
      <DashboardRennergebnisLink
        users={users}
        hours={raceDateHours}
        minutes={raceDateMinutes}
      />
    </div>
  );
}
