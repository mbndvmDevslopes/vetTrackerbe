import cookieParser from 'cookie-parser';
import helmet from 'helmet';

// import * as dotenv from 'dotenv';
import 'dotenv/config';
// dotenv.config();
import express from 'express';
import { Request, Response } from 'express';
import 'express-async-errors';

import cors from 'cors';

const app = express();


//routers
import dogRouter from './routes/dogRouter';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';

//Middleware
import { errorHandlerMiddleware } from '../middleware/errorHandlerMiddleware';
import { authenticateUser } from '../middleware/authMiddleware';
import conditionsRouter from './routes/conditionsRouter';
import conditionsCheckRouter from './routes/conditionsCheckRouter';

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
app.use('*', (_: Request, res: Response) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;
app.listen(port, () => console.log(`Server running on port ${port}`));
