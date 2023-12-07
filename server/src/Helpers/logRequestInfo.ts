import { Request, Response, NextFunction, Router } from 'express';
import getCurrentTime from './getCurrentTime';

const loggingRouter: Router = Router();

loggingRouter.use((req: Request, res: Response, next: NextFunction) => {
    console.log(getCurrentTime(), req.method, req.path, 'SESSION_ID:', req.sessionID);
    next();
})

export default loggingRouter;
