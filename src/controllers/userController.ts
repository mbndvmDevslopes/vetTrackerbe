import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { excludePassword } from '../../utils/passwordUtils.js';

const prisma = new PrismaClient();

export const getCurrentUser = async (req, res) => {
  const user = await prisma.users.findUnique({
    where: {
      id: req.user.userId,
    },
  });
  const loggedInUserWithoutPassword = excludePassword(user, ['password']);
  res.status(StatusCodes.OK).json({ loggedInUserWithoutPassword });
};

export const getStats = async (req, res) => {
  const users = await prisma.users.count();
  const dogs = await prisma.dogs.count();
  res.status(StatusCodes.OK).json({ users, dogs });
};

export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  const id = req.user.userId;

  const data = obj;
  await prisma.users.update({
    where: {
      id: id,
    },
    data,
  });

  res.status(StatusCodes.OK).json({ msg: 'user updated' });
};
