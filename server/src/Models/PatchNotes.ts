import { Schema, model } from 'mongoose';
import { TPatchNotes } from '../types';

const PatchNotesSchema = new Schema<TPatchNotes>({
    version: String,
    changes: [{
        subject: String,
        subject_changes: [String]
    }]
}, { collection: 'PatchNotes' });

export default model<TPatchNotes>('PatchNotesSchema', PatchNotesSchema);