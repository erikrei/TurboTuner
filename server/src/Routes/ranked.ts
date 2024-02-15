import { Router, Request, Response } from 'express';

import UserInfo from '../Models/UserInfo';

import checkIfSessionHasUser from '../Helpers/checkIfSessionHasUser';

const rankedRouter = Router();

rankedRouter.get('/:page', checkIfSessionHasUser, async (req: Request, res: Response) => {
    const page = Number(req.params.page);

    if (isNaN(page)) {
        return res.send(`Angegebene Seite ist keine Zahl.`);
    }

    if (page < 1) {
        return res.send('Seite muss mindestens 1 betragen.');
    }

    try {
        const userInformations = await UserInfo.find();

        if (userInformations.length <= 100 * (page - 1)) {
            return res.send(`Seite ${page} existiert nicht, da es nicht so viele Spieler gibt.`);
        }

        // const userInformationsSorted = userInformations.sort((a, b) => b.points - a.points);

        const startIndex = (page - 1) * 100;
        let endIndex = (page * 100) - 1;

        if (endIndex > userInformations.length) {
            endIndex = userInformations.length;
        }

        const usersOfPage = userInformations.slice(startIndex, endIndex);

        return res.json(usersOfPage);
    } catch (error) {
        console.log(error);
    }
})

export default rankedRouter;