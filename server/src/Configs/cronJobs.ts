import cron from 'node-cron';

import RaceInfo from '../Models/RaceInfo';

import getCurrentTime from '../Helpers/getCurrentTime';
import calculateRaceRanking from '../Helpers/race/calculateRaceRanking';
import getCarStartTime from '../Helpers/car/getCarStartTime';

export function runRaces() {
    cron.schedule('* * * * * *', async () => {
        const currentTime = new Date();

        console.log(`Rennen um: ${getCurrentTime()}`);

        try {
            // const raceInfoResponse = await RaceInfo.findOne({
            //     race_time: {
            //         hours: currentTime.getHours(),
            //         minutes: currentTime.getMinutes()
            //     }
            // })

            const raceInfoResponse = await RaceInfo.findOne({
                race_time: {
                    hours: 0,
                    minutes: 0
                }
            })

            if (!raceInfoResponse) {
                console.log('Kein Rennen gefunden.');
                return;
            }

            if (!raceInfoResponse.users.length) {
                console.log('Keine Benutzer zum Rennen angemeldet.');
            } else {
                console.log(await calculateRaceRanking(raceInfoResponse.users));
            }

            // raceInfoResponse.users = [];

            // await raceInfoResponse.save();

        } catch (error) {
            console.log(error);
        }
    })
}