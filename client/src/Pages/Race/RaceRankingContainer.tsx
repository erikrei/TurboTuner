import { TRaceRanking } from "../../types";

import RaceRankingUser from "./RaceRankingUser";

type RaceRankingContainerProps = {
  ranking: TRaceRanking;
};

export default function RaceRankingContainer({
  ranking,
}: RaceRankingContainerProps) {
  return (
    <>
      {ranking.users.map((user) => (
        <RaceRankingUser user={user} />
      ))}
    </>
  );
}
