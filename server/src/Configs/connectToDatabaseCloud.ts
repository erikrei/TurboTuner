import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import getCurrentTime from '../Helpers/getCurrentTime';

export const mongodbUriCloud: string = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.6tm5dsv.mongodb.net/?retryWrites=true&w=majority`;

export default async function connectToDatabaseCloud() {
    return mongoose.connect(mongodbUriCloud)
        .then(() => console.log(getCurrentTime(), 'Verbunden mit MongoDB-Datenbank'))
}