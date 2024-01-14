import { TRace } from "../../types";

type RaceApplyButtonProps = {
  race: TRace;
  handleApply: (race: TRace) => void;
};

export default function RaceApplyButton({
  race,
  handleApply,
}: RaceApplyButtonProps) {
  return <button onClick={() => handleApply(race)}>Zum Rennen anmelden</button>;
}
