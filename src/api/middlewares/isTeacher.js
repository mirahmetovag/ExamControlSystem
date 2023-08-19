import { Teacher } from '../../models/teacher.model.js';
import { CustomError } from '../../utils/customError.js';
import { verify } from '../../utils/jwt.js';

export const isTeacher = async (req,res,next) => {
try {
    const {token} = req.cookies;
    if (!token) throw new CustomError('Token does not exist', 404);
    const teacherId = verify(token).payload;
    if(!teacherId) throw new CustomError('Token is invalid', 409);
    const findTeacher = await Teacher.findById(teacherId);
    if(!findTeacher) throw new CustomError('Teacher was not found', 409);
    req.teacher = findTeacher;
    next();
} catch (error) {
    next(error);
}}
