import axios from "axios";

import { useUserInfo } from "../../Contexts/UserInfoContext";

import { TRaceRanking, TRaceRankingUser } from "../../types";

type RaceRankingWinningsProps = {
  users: TRaceRankingUser[];
  setRanking: React.Dispatch<React.SetStateAction<TRaceRanking | null>>;
  hours: number;
  minutes: number;
};

export default function RaceRankingWinnings({
  users,
  hours,
  minutes,
  setRanking,
}: RaceRankingWinningsProps) {
  const { userInfo, setUserInfo } = useUserInfo();
  let hasClaimed: boolean | null = null;
  const rankingUser = users.find(
    (user) => user.username === userInfo?.username
  );

  if (rankingUser) {
    hasClaimed = rankingUser.claimedWinnings;
  } else {
  }

  function handleClaimClick() {
    axios
      .put(
        "http://localhost:3000/race/claim",
        {
          hours,
          minutes,
          username: userInfo?.username,
          winnings: rankingUser?.winnings,
        },
        { withCredentials: true }
      )
      .then(({ data }: { data: TRaceRanking }) => {
        setRanking(data);
        userInfo &&
          rankingUser &&
          setUserInfo({
            ...userInfo,
            money: userInfo?.money + rankingUser.winnings,
          });
      });
  }

  return hasClaimed !== null ? (
    <button
      disabled={hasClaimed}
      className="get-race-winnings"
      onClick={handleClaimClick}
    >
      {hasClaimed
        ? "Gewinn schon abgeholt"
        : `Gewinn abholen (${rankingUser?.winnings}€)`}
    </button>
  ) : (
    <span className="ranking-feedback">Nicht am Rennen teilgenommen</span>
  );
}
