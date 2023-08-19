import { Router } from 'express';
import { addResult, getPassedResults, getResults, updateResult } from '../controllers/result.controller.js';
import { isAuth } from '../middlewares/isAuth.js';
import { isTeacher } from '../middlewares/isTeacher.js';
export const router = Router();

router.get('/results', isAuth, getResults);
router.get('/results/passed', isAuth, getPassedResults);
router.post('/result/:answerId', isTeacher, addResult);
router.put('/result/:resultId', isTeacher, updateResult);