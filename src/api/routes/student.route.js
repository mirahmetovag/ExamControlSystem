import { Router } from 'express';
import { addStudent, deleteStudent, getStudent, studentLogin, updateStudent, updateStudentPass } from '../controllers/student.controller.js';
import { isAuth } from '../middlewares/isAuth.js';
import { isTeacher } from '../middlewares/isTeacher.js';
export const router = Router();

router.get('/student/:studentId', isAuth, getStudent);
router.post('/student/login', studentLogin);
router.post('/student', isTeacher, addStudent);
router.put('/student/password', isAuth, updateStudentPass);
router.put('/student/:studentId', isTeacher, updateStudent);
router.delete('/student/:studentId', isTeacher, deleteStudent);