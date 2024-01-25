import GeneralCar from '../Models/GeneralCar';
import RaceInfo from '../Models/RaceInfo';
import PatchNotes from '../Models/PatchNotes';

import { generalCars } from '../Data/generalCars';
import { patchNotes } from '../Data/patchNotes';

import getDatabaseRaces from '../Helpers/race/getDatabaseRaces';

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
        await RaceInfo.create(getDatabaseRaces());
        console.log('Rennen wurden in die Datenbank geladen.');
    }

    const patchNotesResponse = await PatchNotes.find();

    if (!patchNotesResponse.length) {
        console.log('Patch Notes in Datenbank laden...');
        await PatchNotes.create(patchNotes);
        console.log('Patch Notes wurden in die Datenbank geladen.');
    }
}

