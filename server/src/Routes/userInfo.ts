import { Router, Request, Response } from 'express';

import UserInfo from '../Models/UserInfo';
import { TUserInfo } from '../types';

const userInfoRouter = Router();

userInfoRouter.get('/', async (req: Request, res: Response) => {
    try {
        const { _id } = req.session.user;
        const userInfoResponse = await UserInfo.findById<TUserInfo>(_id);
        return res.status(200).json(userInfoResponse);
    } catch (error) {
        console.log(error);
        if (error instanceof TypeError) {
            // Wenn auf _id nicht zugegriffen werden kann
        }
    }

    res.status(404).send('GET /userInfo');
})

userInfoRouter.put('/', async (req: Request, res: Response) => {
    const { _id } = req.session.user;
    const newUserInfo: TUserInfo = req.body;

    try {
        const userInfoResponse = await UserInfo.findByIdAndUpdate<TUserInfo>(_id, newUserInfo, {
            new: true
        });
        return res.status(200).json(userInfoResponse);
    } catch (error) {
        console.log(error);
    }

    res.send('PUT /userInfo');
})

export default userInfoRouter;
