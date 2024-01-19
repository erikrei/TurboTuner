import { TUserCar } from "../../types";

import getCarStartTime from "./getCarStartTime";
import getQualityByStartTime from '../car/getQualityByStartTime';
import getTuningImprovement from "../getTuningImprovement";

export default async function getCarTime(car: TUserCar): Promise<number> {
    try {
        let totalCarTime = await getCarStartTime(car.name);

        const carQuality = getQualityByStartTime(totalCarTime);

        car.tuning_components.map((component) => {
            const name = component.component_name;
            const level = component.component_level;
            for(let i = 1; i <= level; i++) {
                totalCarTime -= getTuningImprovement(name, i, carQuality);
            }
        })

        return totalCarTime;
    } catch(error) {
        console.log(error);
        return -1;
    }
}

