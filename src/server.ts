import 'express-async-errors';
import cookieParser from 'cookie-parser';

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

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Set appropriate CORS headers
/* app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
}); */

app.use('/api/dogs', authenticateUser, dogRouter);
app.use('/api/user', authenticateUser, userRouter);
app.use('/api/auth', authRouter);
app.use('/api/conditions', conditionsRouter);

app.get('/test', (req, res) => {
  res.json({ msg: 'test route' });
});
//NOT FOUND ROUTE MIDDLEWARE
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;
app.listen(port, () => console.log(`Server running on port ${port}`));
