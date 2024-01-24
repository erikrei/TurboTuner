import getTimeFormatted from "../../../Helpers/getTimeFormatted";

type DashboardRennergebnisHeaderTextProps = {
  hours: number;
  minutes: number;
};

export default function DashboardRennergebnisHeaderText({
  hours,
  minutes,
}: DashboardRennergebnisHeaderTextProps) {
  return (
    <div className="rennergebnis-header-text">
      <p>Letztes Rennergebnis</p>
      <span>
        Deine Platzierung im Rennen um {getTimeFormatted(hours, minutes)}
      </span>
    </div>
  );
}
