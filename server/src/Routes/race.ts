import { Router, Request, Response } from 'express';

import checkIfSessionHasUser from '../Helpers/checkIfSessionHasUser';

import RaceInfo from '../Models/RaceInfo';
import UserInfo from '../Models/UserInfo';

import { TRaceTime, TUserInfo } from '../types';

const raceRouter = Router();

raceRouter.get('/', async (req: Request, res: Response) => {
    try {
        const raceInfoResponse = await RaceInfo.find();

        if (!raceInfoResponse) {
            return res.status(404).send('Die Rennen konnten nicht gefunden werden.');
        } else {
            return res.json(raceInfoResponse);
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
        const raceInfoResponse = await RaceInfo.find();

        if (raceInfoResponse) {
            const currentRace = raceInfoResponse.find((race) => race.race_time.hours === hours && race.race_time.minutes === minutes)

            if (currentRace) {
                const userInfoResponse = await UserInfo.findById<TUserInfo>(user_id);

                userInfoResponse && currentRace.users.push({ user_id, username: userInfoResponse.username })

                await currentRace.save();

                return res.json(raceInfoResponse);
            } else {
                return res.status(404).send('Kein Rennen mit angegebenen Zeiten gefunden')
            }
        }

    } catch (error) {
        console.log(error);
    }
})

export default raceRouter;