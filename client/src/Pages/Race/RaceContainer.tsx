import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

import timeFormatted from "../../Helpers/getTimeFormatted";

import { useUserInfo } from "../../Contexts/UserInfoContext";

import { TRaceInformation, TRaceUser } from "../../types";

import RaceApplyButton from "./RaceApplyButton";
import RaceApplyInformation from "./RaceApplyInformation";
import RaceRankingLink from "./RaceRankingLink";

type RaceContainerProps = {
  race: TRaceInformation;
  setRaces: React.Dispatch<React.SetStateAction<TRaceInformation[]>>;
};

export default function RaceContainer({ race, setRaces }: RaceContainerProps) {
  const userId = useUserInfo().userInfo?._id;

  let hasApplied: undefined | TRaceUser;

  if (userId) {
    hasApplied = race.users.find((user) => user.user_id === userId);
  }

  function handleApplyRaceClick(race: TRaceInformation) {
    axios
      .post(
        "http://localhost:3000/race/apply",
        {
          hours: race.race_time.hours,
          minutes: race.race_time.minutes,
        },
        { withCredentials: true }
      )
      .then(({ data }: { data: TRaceInformation[] }) => {
        setRaces(data);
        const formattedTime = timeFormatted(
          race.race_time.hours,
          race.race_time.minutes
        );
        toast(`Erfolgreich zum Rennen um ${formattedTime} angemeldet.`, {
          position: "bottom-right",
          style: {
            backgroundColor: "green",
            color: "white",
            fontWeight: "bold",
          },
          duration: 2000,
        });
      });
  }

  function handleUnApplyRaceClick(race: TRaceInformation) {
    axios
      .post(
        "http://localhost:3000/race/unapply",
        {
          hours: race.race_time.hours,
          minutes: race.race_time.minutes,
        },
        { withCredentials: true }
      )
      .then(({ data }: { data: TRaceInformation[] }) => {
        setRaces(data);
        const formattedTime = timeFormatted(
          race.race_time.hours,
          race.race_time.minutes
        );
        toast(`Erfolgreich vom Rennen um ${formattedTime} abgemeldet.`, {
          position: "bottom-right",
          style: {
            backgroundColor: "lightblue",
            color: "black",
            fontWeight: "bold",
          },
          duration: 2000,
        });
      });
  }

  return (
    <div className="single-race-container">
      <p>
        Rennen um: {race.race_time.hours} Uhr {race.race_time.minutes} min
      </p>
      {hasApplied ? (
        <RaceApplyInformation
          race={race}
          handleUnApply={handleUnApplyRaceClick}
        />
      ) : (
        <RaceApplyButton handleApply={handleApplyRaceClick} race={race} />
      )}
      {race.race_ranking ? <RaceRankingLink raceTime={race.race_time} /> : <p>Keine letzten Ergebnisse vorhanden</p>}
      <Toaster />
    </div>
  );
}
