import { Router, Request, Response } from 'express';

import SavedRace from '../Models/SavedRace';

const savedRaceRouter = Router();

savedRaceRouter.get('/last', async (req: Request, res: Response) => {
    try {
        const savedRaceResponse = await SavedRace.find();

        if (savedRaceResponse.length) {
            return res.json(savedRaceResponse[savedRaceResponse.length - 1])
        } else {
            return res.status(404).send('Keine Rennen in der Datenbank gespeichert.')
        }
    } catch (error) {
        console.log(error);
    }
})

export default savedRaceRouter;