import { Router, Request, Response } from 'express';
import { Error } from 'mongoose';

import { TGeneralCar, TUserCar, TUserCarTuningComponents } from '../types';

import UserCar from '../Models/UserCar';
import UserInfo from '../Models/UserInfo';
import GeneralCar from '../Models/GeneralCar';

import checkIfSessionHasUser from '../Helpers/checkIfSessionHasUser';
import getTuningTime from '../Helpers/getTuningTime';
import getTuningCost from '../Helpers/getTuningCost';
import getTuningImprovement from '../Helpers/getTuningImprovement';

const tuningRouter = Router();

tuningRouter.put('/car/:id', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const car_id: string = req.params.id;
    const { component_name, new_component_level, fast_tuning, car_name } = req.body;
    const tuning_start = new Date().getTime();

    try {

        const generalCarResponse = await GeneralCar.findOne({
            name: car_name
        }) as TGeneralCar;

        const car_quality = generalCarResponse.quality;

        const tuning_end = tuning_start + getTuningTime(new_component_level, fast_tuning, car_quality);

        return res.json(await UserCar.findByIdAndUpdate<TUserCar>(car_id, {
            tuning_information: {
                component_name,
                new_component_level,
                tuning_start,
                tuning_end,
                fast_tuning
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

        const generalCarResponse = await GeneralCar.findOne({
            name: userCarResponse?.name
        }) as TGeneralCar;

        if (userCarResponse && userCarResponse.tuning_information) {
            const { component_name, new_component_level, tuning_end, fast_tuning } = userCarResponse.tuning_information;

            if (tuning_end > new Date().getTime()) return res.status(403).send('Tuning des Autos ist noch nicht fertiggestellt.');

            const tuning_component = userCarResponse.tuning_components.find((component) => component.component_name === component_name);
            if (tuning_component) {
                tuning_component.component_level = new_component_level;
                tuning_component.tuning_cost = getTuningCost(new_component_level + 1, generalCarResponse.quality);
                tuning_component.tuning_time = getTuningTime(new_component_level + 1, false, generalCarResponse.quality);
                tuning_component.tuning_improvement = getTuningImprovement(component_name, new_component_level, generalCarResponse.quality)
            };

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

tuningRouter.put('/cancel/:id', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const user_id: string = req.session.user._id;
    const car_id: string = req.params.id;

    try {
        const userCarResponse = await UserCar.findById(car_id);

        if (userCarResponse) {
            if (!userCarResponse.tuning_information) {
                return res.status(403).send('Auto kann nicht abgebrochen werden, da es nicht am tunen ist.')
            }

            const tuning_component = userCarResponse.tuning_components.find((component) => component.component_name === userCarResponse.tuning_information?.component_name)
            const moneyToReturn = userCarResponse.tuning_information.fast_tuning && tuning_component ? tuning_component?.tuning_cost * 1.3 : tuning_component?.tuning_cost;

            const userInfoResponse = await UserInfo.findByIdAndUpdate(user_id, {
                $inc: {
                    money: moneyToReturn
                }
            })

            userCarResponse.tuning_information = undefined;

            await userCarResponse.save();

            return res.json({
                userCarResponse,
                moneyToReturn
            })
        }

    } catch (error) {
        console.log(error);
    }
})

tuningRouter.put('/dev/finish/:id', async (req: Request, res: Response) => {
    const car_id = req.params.id;
    const { component_name, component_level } = req.body;

    const userCarResponse = await UserCar.findById(car_id);

    if (userCarResponse) {
        const generalCarResponse = await GeneralCar.findOne({
            name: userCarResponse.name
        })

        if (generalCarResponse) {
            const car_quality = generalCarResponse.quality;

            const tuning_component_to_change = userCarResponse.tuning_components.find((component) => component.component_name === component_name);

            if (tuning_component_to_change) {
                tuning_component_to_change.component_level = component_level;
                tuning_component_to_change.tuning_cost = getTuningCost(component_level + 1, car_quality);
                tuning_component_to_change.tuning_time = getTuningTime(component_level + 1, false, car_quality);
                tuning_component_to_change.tuning_improvement = getTuningImprovement(component_name, component_level, car_quality);
            }

            await userCarResponse.save();

            return res.json(userCarResponse);
        } else return res.send('Generelles Auto mit gegebenem Namen ' + userCarResponse.name + ' nicht gefunden.');
    } else return res.status(404).send('Auto mit gegebener ID ' + car_id + ' nicht gefunden.');
})

export default tuningRouter;
