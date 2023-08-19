import { Schema, model } from 'mongoose';

const examSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    deadline: {
        type: Number,
        required: true
    },
    classId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'class'
    }
}, 
{
    timestamps: true
});

export const Exam = model('exam', examSchema);