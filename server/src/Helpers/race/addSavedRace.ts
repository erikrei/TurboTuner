import { TRaceRanking } from "../../types";

import SavedRace from '../../Models/SavedRace';
import getCurrentTime from "../getCurrentTime";

export default async function addSavedRace(race_ranking: TRaceRanking | null) {
    const dateNow = new Date();
    dateNow.setSeconds(0);
    const race_time = dateNow.getTime();

    try {
        if (race_ranking) {
            await SavedRace.create({
                race_ranking,
                race_time
            })
        } else {
            await SavedRace.create({
                race_ranking: {
                    users: []
                },
                race_time
            })
        }

        console.log(`Rennen um ${getCurrentTime(dateNow)} wurde erfolgreich gespeichert.`);
    } catch (error) {
        console.log(error);
    }
}