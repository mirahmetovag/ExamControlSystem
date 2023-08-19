import { Schema, model } from 'mongoose';

const classSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true
});

export const Class = model('class', classSchema);