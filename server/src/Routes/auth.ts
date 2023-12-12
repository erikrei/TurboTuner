import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { MongoError } from 'mongodb';
import bcrypt from 'bcryptjs';

import { TUser, TUserInfo, TValidInput } from '../types';
import User from '../Models/User';
import UserInfo from '../Models/UserInfo';
import checkValidRegisterInputs from '../Helpers/checkValidRegisterInputs';

const authRouter = Router();

authRouter.post('/register', async (req: Request, res: Response) => {
    const { username, password }: TUser = req.body;

    const validInput: TValidInput = checkValidRegisterInputs([username, password]);

    if (validInput.statusCode === 201) {
        try {
            const _id: string = new mongoose.Types.ObjectId().toHexString();
            const hashedPassword: string = bcrypt.hashSync(password);
            const userResponse = await User.create<TUser>({ _id, username, password: hashedPassword });
            const userInfoResponse = await UserInfo.create<TUserInfo>({ _id, username, money: 0, points: 0 });
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

export default authRouter;