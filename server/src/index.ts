import express, { Express } from 'express';
import getCurrentTime from './Helpers/getCurrentTime';

import connectToDatabase from './Configs/connectToDatabase';

import corsRouter from './Configs/cors';
import sessionRouter from './Configs/saveSession';
import loggingRouter from './Helpers/logRequestInfo';

import authRouter from './Routes/auth';
import userInfoRouter from './Routes/userInfo';
import carRouter from './Routes/car';
import tuningRouter from './Routes/tuning';

const app: Express = express();
const PORT: number = 3000;

app.use(express.json());
app.use(corsRouter);
app.use(sessionRouter);
app.use(loggingRouter);

app.use('/auth', authRouter);
app.use('/userInfo', userInfoRouter);
app.use('/car', carRouter);
app.use('/tuning', tuningRouter);

app.listen(PORT, () => {
    console.log(getCurrentTime(), `Server auf Port '${PORT}' gestartet`);
    connectToDatabase();
})
