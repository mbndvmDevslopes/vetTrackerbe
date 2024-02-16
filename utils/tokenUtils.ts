import jwt, { Secret } from 'jsonwebtoken';

export const createJWT = (payload: { userId: string; role: string }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);
  return decoded;
};
