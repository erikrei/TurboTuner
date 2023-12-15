import { Router, Request, Response } from 'express';

import { TUserCar, TUserCarTuningInformation } from '../types';

import UserCar from '../Models/UserCar';

import checkIfSessionHasUser from '../Helpers/checkIfSessionHasUser';
import getTuningTime from '../Helpers/getTuningTime';

const tuningRouter = Router();

/* PUT /tuning/car/:id
 * req.body: {
    component_name: Name der Komponente, die verbesser wird,
    new_component_level: Level der Komponente auf die verbessert wird,
    tuning_start: Start des Verbessern in Millisekunden,
 }
 * Verändert die tuning_information im gegebenen Auto
*/

tuningRouter.put('/car/:id', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const car_id: string = req.params.id;
    const { component_name, new_component_level, tuning_start }: TUserCarTuningInformation = req.body;
    const tuning_end = getTuningTime(tuning_start, new_component_level);

    try {
        const userCarResponse = await UserCar.findById(car_id);

        if (userCarResponse?.tuning_information) {
            const currentTime = new Date().getTime();
            if (userCarResponse.tuning_information.tuning_end < currentTime) {
                let component_to_update = userCarResponse.tuning_components.find((component) => component.component_name === userCarResponse.tuning_information?.component_name);
                if (component_to_update) component_to_update.component_level = userCarResponse.tuning_information.new_component_level;
            } else {
                return res.status(403).json(userCarResponse);
            }

            userCarResponse.tuning_information = {
                component_name,
                new_component_level,
                tuning_start,
                tuning_end
            }

            await userCarResponse.save();

            return res.json(userCarResponse);
        } else {
            return res.json(await UserCar.findByIdAndUpdate<TUserCar>(car_id, {
                tuning_information: {
                    component_name,
                    new_component_level,
                    tuning_start,
                    tuning_end
                }
            }, { new: true }))
        }
    } catch (error) {
        console.log(error);
    }

    res.send('PUT /car/tuning/:ID')
})


export default tuningRouter;