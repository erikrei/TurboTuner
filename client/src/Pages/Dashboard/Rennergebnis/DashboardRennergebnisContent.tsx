import { TRaceRankingUser } from "../../../types";

import { useUserInfo } from "../../../Contexts/UserInfoContext";

import DashboardRennergebnisPlatzierung from "./DashboardRennergebnisPlatzierung";
import DashboardRennergebnisTime from "./DashboardRennergebnisTime";

type DashboardRennergebnisContentProps = {
  users: TRaceRankingUser[];
};

export default function DashboardRennergebnisContent({
  users,
}: DashboardRennergebnisContentProps) {
  const { userInfo } = useUserInfo();
  const currentUser = users.find(
    (user) => user.username === userInfo?.username
  );

  return (
    <div className="rennergebnis-content">
      {currentUser ? (
        <>
          <DashboardRennergebnisPlatzierung ranking={currentUser.ranking} />
          <DashboardRennergebnisTime carTime={currentUser.carTime} />
        </>
      ) : (
        <span>Nicht am Rennen teilgenommen.</span>
      )}
    </div>
  );
}
