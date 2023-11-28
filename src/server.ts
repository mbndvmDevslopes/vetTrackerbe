import 'express-async-errors';

import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import morgan from 'morgan';

const app = express();


//routers
import dogRouter from './routes/dogRouter.js';
import authRouter from './routes/authRouter.js';

//Middleware
import { errorHandlerMiddleware } from '../middleware/errorHandlerMiddleware.js';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use('/dogs', dogRouter);
app.use('/auth', authRouter);

//NOT FOUND ROUTE MIDDLEWARE
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;
app.listen(port, () => console.log(`Server running on port ${port}`));
