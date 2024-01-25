import { TRaceRankingUser } from "../../../types";

import DashboardRennergebnisHeaderText from "./DashboardRennergebnisHeaderText";
// import DashboardRennergebnisLink from "./DashboardRennergebnisLink";

import DashboardLink from "../DashboardLink";

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
      {users.length > 0 && (
        <DashboardLink
          linkText="Ranking ansehen"
          linkURL={`race/ranking?hours=${raceDateHours}&minutes=${raceDateMinutes}`}
        />
      )}
    </div>
  );
}
