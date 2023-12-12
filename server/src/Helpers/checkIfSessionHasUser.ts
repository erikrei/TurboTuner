import { Request, Response, NextFunction } from "express";

export default function checkIfSessionHasUser(req: Request, res: Response, next: NextFunction) {
    const sessionUser = req.session.user;

    if (sessionUser) next();
    else res.status(404).send('Session enthält kein User-Objekt.');
}