import express from 'express';
import getCurrentTime from './getCurrentTime';

const loggingRouter: express.Router = express.Router();

loggingRouter.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(getCurrentTime(), req.method, req.path)
    next();
})

export default loggingRouter;
