import { TRaceInformation } from "../../types";

export default function getDatabaseRaces(): TRaceInformation[] {
    const races: TRaceInformation[] = [];

    for (let i = 0; i < 24; i++) {
        for (let j = 0; j <= 45; j += 15) {
            races.push({
                users: [],
                race_time: {
                    hours: i,
                    minutes: j
                }
            })
        }
    }

    return races;
}