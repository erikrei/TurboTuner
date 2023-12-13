import { Router, Request, Response } from 'express';
import { MongoError } from 'mongodb';
import bcrypt from 'bcryptjs';

import { TUser, TUserInfo, TValidInput } from '../types';

import User from '../Models/User';
import UserInfo from '../Models/UserInfo';
import UserSession from '../Models/UserSession';

import checkValidRegisterInputs from '../Helpers/checkValidRegisterInputs';
import checkIfSessionHasUser from '../Helpers/checkIfSessionHasUser';
import getMongooseObjectId from '../Helpers/getMongooseObjectId';

const authRouter = Router();

authRouter.post('/register', async (req: Request, res: Response) => {
    const { username, password }: TUser = req.body;

    const validInput: TValidInput = checkValidRegisterInputs([username, password]);

    if (validInput.statusCode === 201) {
        try {
            const _id: string = getMongooseObjectId();
            const hashedPassword: string = bcrypt.hashSync(password);
            const userResponse = await User.create<TUser>({ _id, username, password: hashedPassword });
            const userInfoResponse = await UserInfo.create<TUserInfo>({ _id, username, money: 100000, points: 0, firstLogin: true });
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
        return res.status(200).json(dbResponse);

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

export default authRouter;