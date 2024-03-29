import express, { Express } from 'express';
import setTimeZone from './Configs/setTimezone';
import getCurrentTime from './Helpers/getCurrentTime';

import connectToDatabase from './Configs/connectToDatabase';
import connectToDatabaseCloud from './Configs/connectToDatabaseCloud';

import corsRouter from './Configs/cors';
import sessionRouter from './Configs/saveSession';
import loggingRouter from './Helpers/logRequestInfo';

import authRouter from './Routes/auth';
import userInfoRouter from './Routes/userInfo';
import carRouter from './Routes/car';
import tuningRouter from './Routes/tuning';
import raceRouter from './Routes/race';
import patchNotesRouter from './Routes/patchnotes';
import savedRaceRouter from './Routes/savedrace';
import scrapyardRouter from './Routes/scrapyard';
import usedDealerRouter from './Routes/useddealer';
import buildingsRouter from './Routes/buildings';
import rankedRouter from './Routes/ranked';

import { runRaces } from './Configs/cronJobs';

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
app.use('/race', raceRouter);
app.use('/patchnotes', patchNotesRouter);
app.use('/savedrace', savedRaceRouter);
app.use('/scrapyard', scrapyardRouter);
app.use('/useddealer', usedDealerRouter);
app.use('/buildings', buildingsRouter);
app.use('/ranked', rankedRouter);


app.listen(PORT, async () => {
    setTimeZone('Europe/Berlin');
    console.log(getCurrentTime(), `Server auf Port '${PORT}' gestartet`);
    // await connectToDatabase();
    await connectToDatabaseCloud();
    runRaces();
})
