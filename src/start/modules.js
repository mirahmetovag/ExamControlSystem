import express from 'express';
import cors from 'cors';
import fileupload from 'express-fileupload';
import cookie from 'cookie-parser'
import routes from '../api/routes/index.js';
import { errorHandler } from '../api/middlewares/errorHandler.js';


export const modules = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cors({origin: '*'}));
    app.use(fileupload());
    app.use(cookie());
    app.use(express.static(process.cwd() + '/src/uploads'));
    app.use('/api', routes);
    app.use(errorHandler);
};