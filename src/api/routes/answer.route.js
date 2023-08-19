import { Router } from 'express';
import { addAnswer, updateAnswer } from '../controllers/answer.controller.js';
import { isAuth } from '../middlewares/isAuth.js';
export const router = Router();

router.post('/answer', isAuth, addAnswer);
router.put('/answer/:answerId', isAuth, updateAnswer);