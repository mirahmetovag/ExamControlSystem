import { Student } from '../../models/student.model.js';
import { CustomError } from '../../utils/customError.js';
import { verify } from '../../utils/jwt.js';


export const isAuth = async (req,res,next) => {
    try {
        const {token} = req.cookies;
        if (!token) throw new CustomError('Token does not exist', 401);
        const studentId = verify(token).payload;
        console.log(studentId);
        if(!studentId) throw new CustomError('Token is invalid', 401);
        const findStudent = await Student.findOne({_id: studentId})
        if(!findStudent) throw new CustomError('Student is not found', 401);
        if(findStudent.isActive === false) throw new CustomError('Student is not active anymore', 403);
        req.student = findStudent;
        next();
    } catch (error) {
        next(error)
    }
};