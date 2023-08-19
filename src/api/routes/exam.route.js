import { Router } from 'express';
import { addExam, deleteExam, getExam, updateExam } from '../controllers/exam.controller.js';
import { isTeacher } from '../middlewares/isTeacher.js';
export const router = Router();

router.get('/exam/:examId', isTeacher, getExam);
router.post('/exam', isTeacher, addExam);
router.put('/exam/:examId', isTeacher,updateExam);
router.delete('/exam/:examId', isTeacher, deleteExam);