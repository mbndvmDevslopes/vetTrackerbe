import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { hashPassword, comparePassword } from '../../utils/passwordUtils.js';
import { createJWT } from '../../utils/tokenUtils.js';
import {
  UnauthenticatedError,
  UnauthorizedError,
} from '../../errors/customError.js';

const prisma = new PrismaClient();

export const register = async (req, res) => {
  const data = req.body;
  const isFirstAccount = (await prisma.users.count()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';

  const hashedPassword = await hashPassword(data.password);

  data.password = hashedPassword;

  await prisma.users.create({
    data,
  });
  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};

export const login = async (req, res) => {
  const data = req.body;
  const user = await prisma.users.findUnique({
    where: {
      email: data.email,
    },
  });
  const isValidUser =
    user && (await comparePassword(data.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

  const token = createJWT({ userId: user.id, role: user.role });

  res.status(StatusCodes.OK).json({ token });
};
