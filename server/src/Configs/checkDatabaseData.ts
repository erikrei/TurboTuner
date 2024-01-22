import GeneralCar from '../Models/GeneralCar';
import RaceInfo from '../Models/RaceInfo';

import { generalCars } from '../Data/generalCars';
import { races } from '../Data/races';

export default async function checkDatabaseData() {
    const generalCarResponse = await GeneralCar.find();

    if (!generalCarResponse.length) {
        console.log('Generelle Autos in Datenbank laden...');
        await GeneralCar.create(generalCars);
        console.log('Generelle Autos wurden in die Datenbank geladen.');
    }

    const raceInfoResponse = await RaceInfo.find();

    if (!raceInfoResponse.length) {
        console.log('Rennen werden in Datenbank laden...');
        await RaceInfo.create(races);
        console.log('Rennen wurden in die Datenbank geladen.')
    }
}
