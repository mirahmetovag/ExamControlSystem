import jwt from 'jsonwebtoken';
import config from 'config';

const key = config.get('JWT_SECRET_KEY');

export const sign = (payload) => jwt.sign(payload, key);
export const verify = (payload) => jwt.verify(payload, key);