import { Router, Request, Response } from 'express';
import { MongoError } from 'mongodb';

import { TGeneralCar, TUserCar, TUserInfo } from '../types';

import GeneralCar from '../Models/GeneralCar';
import UserCar from '../Models/UserCar';
import UserInfo from '../Models/UserInfo';

import getMongooseObjectId from '../Helpers/getMongooseObjectId';
import checkIfSessionHasUser from '../Helpers/checkIfSessionHasUser';
import basicTuningComponents from '../Helpers/basicTuningComponents';
import getStartTimeOfCar from '../Helpers/getStartTimeOfCar';

const carRouter = Router();

carRouter.put('/changeActiveCar', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const user_id = req.session.user._id;
    const { car_id } = req.body;

    try {
        const activeCar = await UserCar.findById<TUserCar>(car_id);
        const userInfoResponse = await UserInfo.findByIdAndUpdate(user_id, {
            activeCar
        }, { new: true })
        return res.json(userInfoResponse);
    } catch (error) {
        console.log(error);
    }

    res.send('PUT /car/changeActiveCar');
})

carRouter.get('/allUser', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const user_id = req.session.user._id;

    try {
        const getAllUserCarsResponse = await UserCar.find<TUserCar[]>({ user_id });
        return res.json(getAllUserCarsResponse);
    } catch (error) {
        console.log(error)
    }

    res.send('GET /car/allUser');
})

carRouter.get('/allCars/:id', async (req: Request, res: Response) => {
    const car_id = req.params.id;

    try {
        const getCarResponse = await UserCar.findById<TUserCar>(car_id);
        if (getCarResponse) return res.json(getCarResponse);
        else return res.status(404).send('Auto konnte nicht gefunden werden.');
    } catch (error) {
        return res.status(404).send('Auto konnte nicht gefunden werden.');
    }
})

carRouter.post('/addToUser', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const user_id = req.session.user._id;
    const { name }: TGeneralCar = req.body;

    try {
        const generalCarResponse = await GeneralCar.findOne<TGeneralCar>({
            name
        }) as TGeneralCar;

        const _id = getMongooseObjectId();

        const tuning_components = await basicTuningComponents(generalCarResponse.quality, user_id)
        const userCarResponse = await UserCar.create<TUserCar>({ _id, user_id, name, tuning_components })

        const userInfoResponse = await UserInfo.findByIdAndUpdate(user_id, {
            $inc: {
                money: -generalCarResponse.price
            }
        }, { new: true })

        return res.send(`Das Auto ${name} wurde erfolgreich gekauft.`);
    } catch (error) {
        console.log(error);
    }

    res.send(500).send('Unbekannter Fehler aufgetreten. Auto konnte dem Benutzer nicht hinzugefügt werden.')
})

carRouter.get('/general', async (req: Request, res: Response) => {
    try {
        const generalCarsResponse = await GeneralCar.find<TGeneralCar[]>();
        return res.json(generalCarsResponse);
    } catch (error) {
        console.log(error);
    }

    res.status(500).send('Unbekannter Fehler aufgetreten. Generelle Autos konnten nicht zurückgegeben werden.')
})

carRouter.post('/addToUserFirstCar', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const user_id = req.session.user._id;
    const { name } = req.body;

    try {
        const _id = getMongooseObjectId();
        const tuning_components = await basicTuningComponents(3, user_id);
        const userCarResponse = await UserCar.create<TUserCar>({ _id, user_id, name, tuning_components });
        const userInfoResponse = await UserInfo.findByIdAndUpdate<TUserInfo>(user_id, { firstLogin: false, activeCar: userCarResponse });
        return res.send(`Das Auto ${name} wurde erfolgreich hinzugefügt.`);
    } catch (error) {
        console.log(error);
    }

    res.send(500).send('Unbekannter Fehler aufgetreten. Auto konnte dem Benutzer nicht hinzugefügt werden.')
})

carRouter.post('/addGeneralCar', async (req: Request, res: Response) => {
    const { name, price, description, imgSrc, quality }: TGeneralCar = req.body;
    const startTime = getStartTimeOfCar(quality);

    try {
        const generalCarResponse = await GeneralCar.create<TGeneralCar>({ name, price, description, imgSrc, quality, startTime });
        return res.send('Auto wurde erfolgreich in der Datenbank gespeichert.');
    } catch (error) {
        if ((error as MongoError).code === 11000) {
            return res.status(409).send('Name des Autos bereits vergeben.');
        }
    }

    res.status(500).send('Unbekannter Fehler aufgetreten. Auto konnte nicht gespeichert werden.')
})

export default carRouter;