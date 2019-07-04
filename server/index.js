import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import userRouter from './routes/user';
import propertyRouter from './routes/property';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/auth', userRouter);
app.use('/api/v1', propertyRouter);

export default app;