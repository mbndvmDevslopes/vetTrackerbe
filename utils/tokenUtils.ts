import jwt from 'jsonwebtoken';

export const createJWT = (payload: { userId: string; role: string }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};
