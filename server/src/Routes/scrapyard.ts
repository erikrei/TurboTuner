import { Router, Request, Response } from 'express';
import { TUserInfo, TGeneralCar } from '../types';

import UserCar from '../Models/UserCar';
import UserInfo from '../Models/UserInfo';
import GeneralCar from '../Models/GeneralCar';

import checkIfSessionHasUser from '../Helpers/checkIfSessionHasUser';
import calculateScrapyardPrice from '../Helpers/car/calculateScrapyardPrice';

const scrapyardRouter = Router();

scrapyardRouter.get('/price/:car_id', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const user_id = String(req.session.user._id);
    const car_id = req.params.car_id;

    try {
        const userCarResponse = await UserCar.findOne({ _id: car_id });
        const userInfoResponse = await UserInfo.findById(user_id) as TUserInfo;

        if (userCarResponse) {
            const generalCarResponse = await GeneralCar.findOne({ name: userCarResponse.name }) as TGeneralCar;
            const carQuality = generalCarResponse.quality;

            if (userCarResponse.user_id !== user_id) {
                return res.status(403).send('Kein Recht den Preis des Autos abrufen zu können.')
            }

            if (userInfoResponse.activeCar && userInfoResponse.activeCar._id === car_id) {
                return res.status(400).send('Das aktive/ausgewählte Auto kann nicht verschrottet werden.');
            }

            if (userCarResponse.tuning_information) {
                return res.status(400).send('Ein Auto, dessen Tuning noch nicht fertiggestellt ist, kann nicht verschrottet werden.');
            }

            return res.json({
                userCar: userCarResponse,
                scrapyardPrice: calculateScrapyardPrice(userCarResponse.tuning_components, carQuality) + (generalCarResponse.price * .75)
            });

        } else {
            return res.status(404).send('Kein Auto mit gegebener ID gefunden');
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send('Preis des zu verschrottenen Autos konnte nicht abgerufen werden.');
    }
})

scrapyardRouter.delete('/:car_id/:car_cost', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const user_id = req.session.user._id;
    const car_id = req.params.car_id;
    const car_cost = Number(req.params.car_cost);

    try {

        await UserCar.findByIdAndDelete(car_id);

        const userInfoResponse = await UserInfo.findByIdAndUpdate(user_id, {
            $inc: {
                money: car_cost
            }
        }, { new: true })

        return res.json(userInfoResponse);
    } catch (error) {
        console.log(error);
    }
})

export default scrapyardRouter;