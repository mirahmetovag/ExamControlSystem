import { Schema, model } from 'mongoose';

const resultSchema = new Schema({
    answerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'answer'
    },
    score: {
        type: Number,
        required: true,
    },
    isPassed: {
        type: Boolean,
        default: false
    }
}, 
{
    timestamps: true
});

export const Result = model('result', resultSchema);