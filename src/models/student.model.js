import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
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
    classId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'class'
    },
    isActive: {
        type: 'Boolean',
        default: true
    }
}, 
{
    timestamps: true
});

export const Student = model('student', studentSchema);