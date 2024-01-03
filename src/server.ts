import 'express-async-errors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import morgan from 'morgan';
import cors from 'cors';

const app = express();

//routers
import dogRouter from './routes/dogRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

//Middleware
import { errorHandlerMiddleware } from '../middleware/errorHandlerMiddleware.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
import conditionsRouter from './routes/conditionsRouter.js';
import conditionsCheckRouter from './routes/conditionsCheckRouter.js';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use('/api/dogs', authenticateUser, dogRouter);
app.use('/api/user', authenticateUser, userRouter);
app.use('/api/auth', authRouter);
app.use('/api/conditions', authenticateUser, conditionsRouter);
app.use('/api/checkUsage', authenticateUser, conditionsCheckRouter);

//NOT FOUND ROUTE MIDDLEWARE
app.use('*', (_, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;
app.listen(port, () => console.log(`Server running on port ${port}`));
