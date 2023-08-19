import { Schema, model } from 'mongoose';

const teacherSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, 
{
    timestamps: true
});

export const Teacher = model('teacher', teacherSchema);