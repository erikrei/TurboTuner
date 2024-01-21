import { TRaceRankingUser } from "../../types";

type RaceRankingUserProps = {
  user: TRaceRankingUser;
};

export default function RaceRankingUser({ user }: RaceRankingUserProps) {
  return (
    <div className="ranking-user-container">
      <p>
        {user.ranking}. {user.username} {user.carTime}
      </p>
    </div>
  );
}
