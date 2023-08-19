import { Schema, model } from 'mongoose';

const answerSchema = new Schema({
    file: {
        type: String,
        required: true
    },
    studentId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'student'
    },
    classId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'class'
    },
    examId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'exam'
    }
}, 
{
    timestamps: true
});

export const Answer = model('answer', answerSchema);