import { Router, Request, Response } from 'express';
import PatchNotes from '../Models/PatchNotes';
import { TPatchNotes } from '../types';

const patchNotesRouter = Router();

patchNotesRouter.post('/add', async (req: Request, res: Response) => {
    const { version, changes }: TPatchNotes = req.body;

    try {
        const patchNotesResponse = await PatchNotes.create({
            version,
            changes
        })

        return res.json(patchNotesResponse);
    } catch (error) {
        console.log(error);
    }
})

patchNotesRouter.get('/last', async (req: Request, res: Response) => {
    try {
        const patchNotesResponse = await PatchNotes.find();

        if (patchNotesResponse) {
            return res.json(patchNotesResponse[patchNotesResponse.length - 1])
        } else {
            return res.status(404).send('Keine Patch Notizen vorhanden.');
        }
    } catch (error) {
        console.log(error);
    }
})

patchNotesRouter.get('/:version', async (req: Request, res: Response) => {
    const version = req.params.version;

    try {
        const patchNotesResponse = await PatchNotes.findOne({
            version: version
        })

        if (patchNotesResponse) {
            return res.json(patchNotesResponse);
        } else {
            return res.status(404).send('Keine Patch Notes mit angegebener Version gefunden.');
        }
    } catch (error) {
        console.log(error);
    }
})

export default patchNotesRouter;