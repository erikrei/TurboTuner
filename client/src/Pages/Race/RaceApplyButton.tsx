import { TRaceInformation } from "../../types";

type RaceApplyButtonProps = {
  race: TRaceInformation;
  handleApply: (race: TRaceInformation) => void;
};

export default function RaceApplyButton({
  race,
  handleApply,
}: RaceApplyButtonProps) {
  return (
    <div>
      <button onClick={() => handleApply(race)}>Zum Rennen anmelden</button>
    </div>
  );
}
