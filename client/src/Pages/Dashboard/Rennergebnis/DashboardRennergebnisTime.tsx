import { BsClockHistory } from "react-icons/bs";

type DashboardRennergebnisTimeProps = {
  carTime: string;
};

export default function DashboardRennergebnisTime({
  carTime,
}: DashboardRennergebnisTimeProps) {
  return (
    <div className="rennergebnis-time-container">
      <BsClockHistory />
      <span>{carTime}</span>
    </div>
  );
}
