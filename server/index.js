import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { Pool } from 'pg';

import userRouter from './routes/user';
import propertyRouter from './routes/property';
import config from './config/config';

const app = express();
const env = process.env.NODE_ENV;

const currentEnvConfig = config[env];

const pool = new Pool({
    connectionString: currentEnvConfig.DATABASE_URL,
});

pool.on('connect', () => {
    console.log('Database connected successfully');
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/auth', userRouter);
app.use('/api/v1', propertyRouter);

export { app, pool };