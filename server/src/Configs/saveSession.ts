import express from 'express';
import session from 'express-session';
import { TUser } from '../types';

import { mongodbUri } from './connectToDatabase';
import { mongodbUriCloud } from './connectToDatabaseCloud';

declare module 'express-session' {
    interface Session {
        user: TUser
    }
}

const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: mongodbUri,
    collection: 'userSessions'
})

const sessionRouter = express.Router();

sessionRouter.use(session({
    store: store,
    secret: process.env.SESSION_SECRET || 'tmp_secret_for_session',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        // maxAge: 1000 * 60 * 60
    }
}))

export default sessionRouter;
