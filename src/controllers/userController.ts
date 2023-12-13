import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { excludePassword } from '../../utils/passwordUtils.js';

const prisma = new PrismaClient();

type UserRequest = Request & {
  user?: {
    userId: string;
  };
};

export const getCurrentUser = async (req: UserRequest, res: Response) => {
  const userFromDb = await prisma.users.findUnique({
    where: {
      id: req.user.userId || null,
    },
  });
  const loggedInUserWithoutPassword = excludePassword(userFromDb, ['password']);
  res.status(StatusCodes.OK).json({ loggedInUserWithoutPassword });
};

export const getStats = async (_: Request, res: Response) => {
  const users = await prisma.users.count();
  const dogs = await prisma.dogs.count();
  res.status(StatusCodes.OK).json({ users, dogs });
};

export const updateUser = async (req: UserRequest, res: Response) => {
  const newUser = { ...req.body };
  delete newUser.password;
  const id = req.user.userId;

  const data = newUser;
  await prisma.users.update({
    where: {
      id: id,
    },
    data,
  });

  res.status(StatusCodes.OK).json({ msg: 'user updated' });
};
