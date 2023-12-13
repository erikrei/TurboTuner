import mongoose from 'mongoose';

export default function getMongooseObjectId(): string {
    return new mongoose.Types.ObjectId().toHexString();
}