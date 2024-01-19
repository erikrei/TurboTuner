import GeneralCar from '../../Models/GeneralCar';
import { TGeneralCar } from '../../types';

export default async function getCarStartTime(carName: string): Promise<number> {
    try {
        const generalCar = await GeneralCar.findOne({
            name: carName
        }) as TGeneralCar;

        return generalCar.startTime;
    } catch(error) {
        console.log(error);
        return 0;
    }
}

// getCarStartTime("HorizonVista");