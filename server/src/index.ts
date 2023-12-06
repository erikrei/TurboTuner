import express from 'express';
import getCurrentTime from './Helpers/getCurrentTime';

import connectToDatabase from './Configs/connectToDatabase';

import corsRouter from './Configs/cors';
import loggingRouter from './Helpers/logRequestInfo';

const app: express.Express = express();
const PORT: number = 3000;

app.use(express.json());
app.use(corsRouter);
app.use(loggingRouter);

app.listen(PORT, () => {
    console.log(getCurrentTime(), `Server auf Port '${PORT}' gestartet`);
    connectToDatabase();
})
