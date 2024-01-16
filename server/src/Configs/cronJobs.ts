import cron from 'node-cron';

import RaceInfo from '../Models/RaceInfo';

import getCurrentTime from '../Helpers/getCurrentTime';

import UserInfo from '../Models/UserInfo';

export function runRaces() {
    cron.schedule('*/15 * * * *', async () => {
        const currentTime = new Date();

        console.log(`Rennen um: ${getCurrentTime()}`);

        try {
            const raceInfoResponse = await RaceInfo.findOne({
                race_time: {
                    hours: currentTime.getHours(),
                    minutes: currentTime.getMinutes()
                }
            })

            if (!raceInfoResponse) {
                console.log('Kein Rennen gefunden.');
                return;
            }

            if (!raceInfoResponse.users.length) {
                console.log('Keine Benutzer zum Rennen angemeldet.');
            } else {
                console.log('Folgende Benutzer sind zum Rennen angemeldet: ');
                raceInfoResponse.users.map(async (user) => {
                    console.log(user.username);
                    try {
                        await UserInfo.findByIdAndUpdate(user.user_id, {
                            $inc: {
                                money: 50000
                            }
                        });
                    } catch (error) {
                        console.log(error);
                    }
                });
            }

            raceInfoResponse.users = [];

            await raceInfoResponse.save();

        } catch (error) {
            console.log(error);
        }
    })
}