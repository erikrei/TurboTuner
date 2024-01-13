import cron from 'node-cron';

import RaceInfo from '../Models/RaceInfo';

export function runRaces() {
    cron.schedule('*/15 * * * *', async () => {
        const currentTime = new Date();

        try {
            const raceInfoResponse = await RaceInfo.findOne({
                race_time: {
                    hours: currentTime.getHours(),
                    minutes: currentTime.getMinutes()
                }
            })

            if (!raceInfoResponse) return;

            raceInfoResponse.users.map((user) => console.log(user.username));

        } catch (error) {
            console.log(error);
        }
    })
}