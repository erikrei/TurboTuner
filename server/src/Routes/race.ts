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

raceRouter.get('/ranking/:hours/:minutes', checkIfSessionHasUser, async (req, res) => {
    const hours = Number(req.params.hours);
    const minutes = Number(req.params.minutes);

    if (hours === undefined || minutes === undefined) {
        return res.status(400).send('Die Startzeit des Rennens muss angegeben werden.');
    }

    try {
        const raceInfoResponse = await RaceInfo.findOne({
            race_time: {
                hours,
                minutes
            }
        })

        if (raceInfoResponse) {
            return res.json(raceInfoResponse.race_ranking);
        } else {
            return res.status(404).send('Rennen mit angegebenen Zeiten nicht gefunden.');
        }
    } catch (error) {
        console.log(error);
    }
})

raceRouter.put('/claim', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const { hours, minutes, username, winnings } = req.body;

    try {
        const raceInfoResponse = await RaceInfo.findOne({
            race_time: {
                hours,
                minutes
            }
        })

        if (raceInfoResponse) {
            const raceRanking = raceInfoResponse.race_ranking;

            if (raceRanking) {
                const rankingUser = raceRanking.users.find((user) => user.username === username);

                if (rankingUser) {
                    rankingUser.claimedWinnings = true;

                    await raceInfoResponse.save();
                } else {
                    return res.status(404).send('Angegebener Benutzer nicht im Ranking des Rennens enthalten.');
                }
            } else {
                return res.status(404).send('Angegebenes Rennen enthält kein Ranking.');
            }
        } else {
            return res.status(404).send('Rennen mit angegebenen Zeiten wurde nicht gefunden.');
        }

        await UserInfo.findOneAndUpdate({
            username
        }, {
            $inc: {
                money: winnings
            }
        })

        return res.json(raceInfoResponse.race_ranking);
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

raceRouter.post('/unapply', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const user_id = String(req.session.user._id);
    const { hours, minutes }: TRaceTime = req.body;

    try {
        const raceInfoResponse = await RaceInfo.find();

        if (raceInfoResponse) {
            const currentRace = raceInfoResponse.find((race) => race.race_time.hours === hours && race.race_time.minutes === minutes);

            if (currentRace) {
                currentRace.users = currentRace.users.filter((user) => user.user_id !== user_id);
                await currentRace.save();
                return res.json(raceInfoResponse);
            } else {
                res.status(404).send('Rennen mit angegebenen Zeiten wurde nicht gefunden');
            }
        }
    } catch (error) {
        console.log(error);
    }
})

raceRouter.post('/emptyAllRaces', async (req: Request, res: Response) => {
    try {
        const raceInfoResponse = await RaceInfo.find();
        raceInfoResponse.map(async (race) => {
            race.users = [];
            await race.save();
        });

        return res.json(raceInfoResponse);

    } catch (error) {
        console.log(error);
    }
})

export default raceRouter;