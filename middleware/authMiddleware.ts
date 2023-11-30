import { verifyJWT } from '../utils/tokenUtils.js';
import {
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/customError.js';

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('authentication invalid');
  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};

export const authorizePermissions = (...role) => {
  return async (req, res, next) => {
    if (!role.includes(req.user.role)) {
      throw new UnauthorizedError('unauthorized');
    }
    next();
  };
};
