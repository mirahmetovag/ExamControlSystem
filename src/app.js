import express from 'express';
const app = express();

import {Redis} from 'ioredis';

export const redis = new Redis({
    port: 6379,
    host: '127.0.0.1'
});

import {modules} from './start/modules.js';
import {run} from './start/run.js';

modules(app);
run(app);