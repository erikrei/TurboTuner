import { Router, Request, Response } from 'express';
import { Error } from 'mongoose';

import { TUser, TUserCar, TUserCarTuningInformation } from '../types';

import UserCar from '../Models/UserCar';

import checkIfSessionHasUser from '../Helpers/checkIfSessionHasUser';
import getTuningTime from '../Helpers/getTuningTime';

const tuningRouter = Router();

/* PUT /tuning/car/:id
 * req.body: {
    component_name: Name der Komponente, die verbesser wird,
    new_component_level: Level der Komponente auf die verbessert wird
 }
 * Verändert die tuning_information im gegebenen Auto
*/

tuningRouter.put('/car/:id', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const car_id: string = req.params.id;
    const { component_name, new_component_level }: TUserCarTuningInformation = req.body;
    const tuning_start = new Date().getTime();
    const tuning_end = getTuningTime(tuning_start, new_component_level);

    try {
        return res.json(await UserCar.findByIdAndUpdate<TUserCar>(car_id, {
            tuning_information: {
                component_name,
                new_component_level,
                tuning_start,
                tuning_end
            }
        }, { new: true }))
    } catch (error) {
        console.log(error);
    }

    res.send('PUT /car/tuning/:ID')
})

tuningRouter.put('/finish/:id', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const car_id: string = req.params.id;

    try {
        const userCarResponse = await UserCar.findById(car_id);

        if (userCarResponse && userCarResponse.tuning_information) {
            const { component_name, new_component_level, tuning_end } = userCarResponse.tuning_information;

            if (tuning_end > new Date().getTime()) return res.status(403).send('Tuning des Autos ist noch nicht fertiggestellt.');

            const tuning_component = userCarResponse.tuning_components.find((component) => component.component_name === component_name);
            if (tuning_component) tuning_component.component_level = new_component_level;

            userCarResponse.tuning_information = undefined;

            await userCarResponse.save();

            return res.json(userCarResponse);
        } else {
            return res.status(404).send('Auto mit gegebener ID wurde nicht gefunden');
        }

    } catch (error) {
        if (error instanceof Error.CastError) {
            return res.status(400).send('Angegebene ID ist nicht gültig.');
        }
    }

})

export default tuningRouter;