import { Router, Request, Response } from 'express';
import { MongoError } from 'mongodb';
import bcrypt from 'bcryptjs';

import { TBuildings, TUser, TUserInfo, TValidInput, TUserCar } from '../types';

import User from '../Models/User';
import UserInfo from '../Models/UserInfo';
import UserSession from '../Models/UserSession';
import Buildings from '../Models/Buildings';

import checkValidRegisterInputs from '../Helpers/checkValidRegisterInputs';
import checkIfSessionHasUser from '../Helpers/checkIfSessionHasUser';
import getMongooseObjectId from '../Helpers/getMongooseObjectId';

import { initialBuildingInformation } from '../Data/initBuildings';

import UserCar from '../Models/UserCar';
import basicTuningComponents from '../Helpers/basicTuningComponents';

const authRouter = Router();

authRouter.post('/register', async (req: Request, res: Response) => {
    const { username, password }: TUser = req.body;

    const validInput: TValidInput = checkValidRegisterInputs([username, password]);

    if (validInput.statusCode === 201) {
        try {
            const _id: string = getMongooseObjectId();
            const hashedPassword: string = bcrypt.hashSync(password);
            await User.create<TUser>({ _id, username, password: hashedPassword });
            await UserInfo.create<TUserInfo>({ _id, username, money: 100000, points: 0, firstLogin: true });
            await Buildings.create<TBuildings>({
                user_id: _id,
                buildings: initialBuildingInformation
            })
        } catch (error) {
            if ((error as MongoError).code === 11000) {
                validInput.feedbackMsg = 'Benutzername ist bereits vergeben.';
                validInput.statusCode = 409;
            }
        }
    }

    res.status(validInput.statusCode).send(validInput.feedbackMsg);
})

authRouter.post('/login', async (req: Request, res: Response) => {
    const { username, password }: TUser = req.body;

    try {
        const dbResponse = await User.findOne<TUser>({ username });

        if (!dbResponse) {
            return res.status(404).send('Benutzer wurde nicht gefunden.');
        }

        const passwordCorrect: boolean = bcrypt.compareSync(password, dbResponse.password);

        if (!passwordCorrect) {
            return res.status(401).send('Die Eingaben stimmen nicht überein.');
        }

        req.session.user = dbResponse;
        const userInfo = await UserInfo.findById(dbResponse._id);
        return res.status(200).json(userInfo);

    } catch (error) {
        console.log(error);
    }

    res.status(500).send('Login war aus unbekannten Gründen nicht erfolgreich.')
})

authRouter.post('/logout', checkIfSessionHasUser, async (req, res) => {
    const _id = req.sessionID;

    try {
        const userSessionResponse = await UserSession.findByIdAndDelete(_id);
        return res.status(200).send('Benutzer wurde erfolgreich ausgeloggt.');
    } catch (error) {
        console.log(error);
    }

    res.status(500).send('Benutzer konnte aus unbekannten Gründen nicht ausgeloggt werden.');
})


// DEV ROUTE: Registriert X Anzahl von zufälligen Benutzern aus Testgründen
authRouter.post('/dev/registerUsers/:count', async (req: Request, res: Response) => {
    const count = Number(req.params.count);

    if (isNaN(count)) return res.send(':count ist keine Zahl');

    try {
        for (let i = 0; i < count; i++) {
            const username = (+new Date * Math.random()).toString(36).substring(0, 6);
            const _id: string = getMongooseObjectId();
            const points = Math.floor(Math.random() * (134213 - 1500 + 1) + 1500);
            await UserInfo.create<TUserInfo>({ _id, username, money: 100000, points, firstLogin: false });
        }

        return res.send('Test');
    } catch (error) {
        console.log(error);
    }
})

export default authRouter;