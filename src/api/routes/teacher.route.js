import { Router } from 'express';
import { teacherLogout, getTeachersClasses, getTeachersStudents, teacherLogin, teacherRegister, teacherRegisterVerification } from '../controllers/teacher.controller.js';
import { isTeacher } from '../middlewares/isTeacher.js';
export const router = Router();

router.get('/teacher/classes', isTeacher, getTeachersClasses);
router.get('/teacher/students', isTeacher, getTeachersStudents);

router.post('/teacher/register', teacherRegister);
router.post('/teacher/register/verification', teacherRegisterVerification);
router.post('/teacher/login', teacherLogin);
router.post('/teacher/logout', isTeacher, teacherLogout);