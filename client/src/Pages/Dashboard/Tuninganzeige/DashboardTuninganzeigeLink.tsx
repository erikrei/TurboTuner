import { NavLink } from "react-router-dom";

import { PiArrowUpRightBold } from "react-icons/pi";

export default function DashboardTuninganzeigeLink() {
  return (
    <NavLink to="tuning">
      Zum Tuning
      <PiArrowUpRightBold />
    </NavLink>
  );
}
