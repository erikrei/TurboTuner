import cron from 'node-cron';

import RaceInfo from '../Models/RaceInfo';

import getCurrentTime from '../Helpers/getCurrentTime';
import calculateRaceRanking from '../Helpers/race/calculateRaceRanking';

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
                const raceRanking = await calculateRaceRanking(raceInfoResponse.users)
                raceInfoResponse.race_ranking = raceRanking;

                if (raceRanking) {
                    raceRanking.users.map((user) => {
                        console.log(`${user.ranking}. ${user.username} ${user.carTime} (${user.winnings} €)`)
                    })
                }

                raceInfoResponse.users = [];

                await raceInfoResponse.save();
            }
        } catch (error) {
            console.log(error);
        }
    })
}