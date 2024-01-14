import { TRace } from "../../types";

type RaceApplyInformationProps = {
  race: TRace;
  handleUnApply: (race: TRace) => void;
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
