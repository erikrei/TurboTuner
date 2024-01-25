import { MdOutlineTimer } from "react-icons/md";

import DashboardRennenCountdownTimer from "./DashboardRennenCountdownTimer";

export default function DashboardRennenCountdownContent() {
  return (
    <div className="rennencountdown-content">
      <MdOutlineTimer />
      <DashboardRennenCountdownTimer />
    </div>
  );
}
