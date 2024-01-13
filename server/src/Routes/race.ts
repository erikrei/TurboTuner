import { Router, Request, Response } from 'express';

import checkIfSessionHasUser from '../Helpers/checkIfSessionHasUser';

import RaceInfo from '../Models/RaceInfo';
import UserInfo from '../Models/UserInfo';

import { TRaceTime, TUserInfo, TRaceUser, TRaceInformation } from '../types';

const raceRouter = Router();

raceRouter.get('/', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const user_id = String(req.session.user._id);
    const { hours, minutes }: TRaceTime = req.body;

    try {
        const raceInfoResponse = await RaceInfo.findOne<TRaceInformation>({
            race_time: {
                hours,
                minutes
            }
        })

        if (!raceInfoResponse) {
            return res.status(404).send('Rennen wurde nicht gefunden');
        }

        if (raceInfoResponse.users.find((user) => user.user_id === user_id)) {
            return res.json({
                appliedToRace: true
            })
        } else {
            return res.json({
                appliedToRace: false
            })
        }

    } catch (error) {
        console.log(error);
    }
})

raceRouter.post('/add/race', async (req: Request, res: Response) => {
    const { hours, minutes }: TRaceTime = req.body;

    if (hours === undefined || minutes === undefined) {
        return res.status(400).send('Stunden und Minuten müssen angegeben werden.');
    }

    try {
        const raceInfoResponse = await RaceInfo.create({
            users: [],
            race_time: {
                hours,
                minutes
            }
        })

        return res.json(raceInfoResponse);
    } catch (error) {
        console.log(error)
    }
})

raceRouter.post('/apply', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const user_id = String(req.session.user._id);
    const { hours, minutes }: TRaceTime = req.body;

    if (hours === undefined || minutes === undefined) {
        return res.status(400).send('Stunden und Minuten müssen angegeben werden.');
    }

    try {
        const raceInfoResponse = await RaceInfo.findOne({
            race_time: {
                hours,
                minutes
            }
        });

        const userInfoResponse = await UserInfo.findById<TUserInfo>(user_id);

        if (userInfoResponse) {
            const raceUserInfo: TRaceUser = {
                user_id: userInfoResponse._id,
                username: userInfoResponse.username
            }

            if (raceInfoResponse) {
                if (raceInfoResponse.users.find((user) => user.user_id === user_id)) {
                    return res.status(400).send('Benutzer bereits zum Rennen angemeldet.');
                }

                raceInfoResponse.users.push(raceUserInfo);

                await raceInfoResponse.save();

                return res.send('Erfolgreich zum Rennen angemeldet.');
            } else {
                return res.status(404).send('Rennen wurde nicht gefunden.');
            }
        } else {
            return res.status(404).send('Benutzer nicht gefunden.');
        }
    } catch (error) {
        console.log(error);
    }
})

export default raceRouter;