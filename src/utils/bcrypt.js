import {hash,compare} from 'bcrypt';

export const hashPass = async(payload) => await hash(payload, 10);
export const comparePass = async(payload, hashedPass) =>  await compare(payload, hashedPass);