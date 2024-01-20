import { TTmpUser } from "./calculateRaceRanking"
import { TRaceRanking } from "../../types"

import getRaceWinnings from './getRaceWinnings';
import getCarTimeReadableString from '../car/getCarTimeReadableString';

export default function getRaceRanking(tmpUsers: TTmpUser[]): TRaceRanking {
    const ranking: TRaceRanking = {
        users: []
    };

    for (let i = 0; i < tmpUsers.length; i++) {
        ranking.users.push({
            ranking: i + 1,
            username: tmpUsers[i].username,
            winnings: getRaceWinnings(i + 1),
            claimedWinnings: false,
            carTime: getCarTimeReadableString(tmpUsers[i].time)
        })
    }

    return ranking;
}