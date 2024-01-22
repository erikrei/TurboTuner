import mongoose from 'mongoose';
import getCurrentTime from '../Helpers/getCurrentTime';

export const mongodbUri: string = `mongodb://admin:12345@db:27017/test?authSource=admin`;

export default async function connectToDatabase() {
    return mongoose.connect(mongodbUri)
        .then(() => console.log(getCurrentTime(), 'Verbunden mit MongoDB-Datenbank'))
}