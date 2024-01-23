import UserInfo from '../../Models/UserInfo';

export default async function calculateUserPoints(money: number, user_id?: string, username?: string, fast_tuning: boolean = false) {
    if (fast_tuning) money *= 1.3;
    const pointsToAdd = Math.round(money / 1000);

    try {
        if (user_id) {
            await UserInfo.findByIdAndUpdate(user_id, {
                $inc: {
                    points: pointsToAdd
                }
            })
        } else if (username) {
            await UserInfo.findOneAndUpdate({
                username: username
            }, {
                $inc: {
                    points: pointsToAdd
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}