import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/tokenUtils';
import {
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/customError';

type UserRequest = Request & {
  user?: {
    userId: string;
    role: string;
  };
};
type JwtPayload = {
  userId: string;
  role: string;
};

export const authenticateUser = async (
  req: UserRequest,
  _: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError('authentication invalid');
  }
  try {
    const { userId, role } = verifyJWT(token) as JwtPayload;
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};


export const authorizePermissions = (...role: string[]) => {
  return async (req: UserRequest, _: Response, next: NextFunction) => {
    if (req.user && role.includes(req.user.role)) {
      next();
      return;
    }
    throw new UnauthorizedError('unauthorized');
  };
};
