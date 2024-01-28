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
      <h2>Ranking</h2>
      {ranking.users.map((user) => (
        <RaceRankingUser key={user._id} user={user} />
      ))}
    </>
  );
}
