import { NavLink } from "react-router-dom";
import { PiArrowUpRightBold } from "react-icons/pi";

import { TRaceRankingUser } from "../../../types";

import { useUserInfo } from "../../../Contexts/UserInfoContext";

type DashboardRennergebnisLinkProps = {
  users: TRaceRankingUser[];
  hours: number;
  minutes: number;
};

export default function DashboardRennergebnisLink({
  users,
  hours,
  minutes,
}: DashboardRennergebnisLinkProps) {
  if (!users.length) {
    return null;
  }

  return (
    <NavLink to={`race/ranking?hours=${hours}&minutes=${minutes}`}>
      <span>Ranking ansehen</span>
      <PiArrowUpRightBold />
    </NavLink>
  );
}
