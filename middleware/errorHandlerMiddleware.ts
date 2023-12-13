import { Request, Response, NextFunction } from 'express';

import { StatusCodes } from 'http-status-codes';

class CustomError extends Error {
  statusCode: number;

  constructor(
    message: string,
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandlerMiddleware = (
  err: CustomError,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || 'Something went wrong, try again later';
  res.status(statusCode).json({ msg });
  next();
};
