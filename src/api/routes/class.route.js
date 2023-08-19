import { Router } from 'express';
import { addClass, deleteClass, getClass, updateClass } from '../controllers/class.controller.js';
import { isTeacher } from '../middlewares/isTeacher.js';
export const router = Router();

router.get('/class/:classId', getClass);
router.post('/class', isTeacher, addClass);
router.put('/class/:classId', isTeacher, updateClass);
router.delete('/class/:classId', isTeacher, deleteClass);