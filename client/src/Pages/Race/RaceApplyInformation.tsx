import { TRaceInformation } from "../../types";

type RaceApplyInformationProps = {
  race: TRaceInformation;
  handleUnApply: (race: TRaceInformation) => void;
};

export default function RaceApplyInformation({
  race,
  handleUnApply,
}: RaceApplyInformationProps) {
  return (
    <div>
      <span>Du bist zu diesem Rennen bereits angemeldet.</span>
      <button onClick={() => handleUnApply(race)}>Abmelden</button>
    </div>
  );
}
