import cors from 'cors';
import { Router } from 'express';

const corsRouter: Router = Router();

corsRouter.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

export default corsRouter;