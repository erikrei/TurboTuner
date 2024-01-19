import { TRaceUser, TRaceRanking, TUserInfo, TUserCar } from "../../types";
import UserInfo from '../../Models/UserInfo';
import UserCar from '../../Models/UserCar';

import getCarTime from '../car/getCarTime';
import getRaceRanking from "./getRaceRanking";

export type TTmpUser = {
    username: string,
    time: number
}

export default async function calculateRaceRanking(users: TRaceUser[]): Promise<TRaceRanking | null> {
    let usersWithTime: TTmpUser[] = [];

    try {
        for (let i = 0; i < users.length; i++) {
            const userResponse = await UserInfo.findById(users[i].user_id) as TUserInfo;
            const userCarId = userResponse.activeCar?._id;

            if (userCarId) {
                const userCarResponse = await UserCar.findById(userCarId) as TUserCar;
                const carTime = await getCarTime(userCarResponse);
                usersWithTime.push({
                    username: users[i].username,
                    time: carTime
                })
            }
        }

        usersWithTime = usersWithTime.sort((a, b) => b.time - a.time);

        return getRaceRanking(usersWithTime);

    } catch (error) {
        console.log(error);
    }

    return null;
}