import { useContext } from "react";
import axios from "axios";

import { UserInfoContext } from "../DashboardLayout";
import { TRace, TRaceUser } from "../../types";

import RaceApplyButton from "./RaceApplyButton";

type RaceContainerProps = {
  race: TRace;
  setRaces: React.Dispatch<React.SetStateAction<TRace[]>>;
};

export default function RaceContainer({ race, setRaces }: RaceContainerProps) {
  const userId = useContext(UserInfoContext)?.userInfo._id;

  let hasApplied: undefined | TRaceUser;

  if (userId) {
    hasApplied = race.users.find((user) => user.user_id === userId);
  }

  function handleApplyRaceClick(race: TRace) {
    axios
      .post(
        "http://localhost:3000/race/apply",
        {
          hours: race.race_time.hours,
          minutes: race.race_time.minutes,
        },
        { withCredentials: true }
      )
      .then(({ data }: { data: TRace[] }) => setRaces(data));
  }

  return (
    <div className="single-race-container">
      <p>
        Rennen um: {race.race_time.hours} Uhr {race.race_time.minutes} min
      </p>
      {hasApplied ? (
        <p>Du bist zu diesem Rennen bereits angemeldet. </p>
      ) : (
        <RaceApplyButton handleApply={handleApplyRaceClick} race={race} />
      )}
    </div>
  );
}
