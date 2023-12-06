import cors from 'cors';
import express from 'express';

const corsRouter: express.Router = express.Router();

corsRouter.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

export default corsRouter;