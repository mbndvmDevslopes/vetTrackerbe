import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { excludePassword } from '../../utils/passwordUtils';

const prisma = new PrismaClient();

type UserRequest = Request & {
  user?: {
    userId: string;
  };
};

export const getCurrentUser = async (req: UserRequest, res: Response) => {
  const userFromDb = await prisma.users.findUnique({
    where: {
      id: req.user?.userId || undefined,
    },
  });
  const loggedInUserWithoutPassword = excludePassword(userFromDb!, [
    'password',
  ]);
  res.status(StatusCodes.OK).json({ loggedInUserWithoutPassword });
};

//This to be implemented in the future
export const getStats = async (_: Request, res: Response) => {
  const users = await prisma.users.count();
  const dogs = await prisma.dogs.count();
  res.status(StatusCodes.OK).json({ users, dogs });
};

export const updateUser = async (req: UserRequest, res: Response) => {
  const newUser = { ...req.body };
  delete newUser.password;
  const id = req.user?.userId;

  const data = newUser;
  await prisma.users.update({
    where: {
      id: id,
    },
    data,
  });

  res.status(StatusCodes.OK).json({ msg: 'user updated' });
};


export const allUsers = async (_:UserRequest, res:Response) => {
  const users = await prisma.users.findMany({
    select:{
      email:true,
      firstName: true,
      lastName: true,
      role:true,
    }
})
res.status(StatusCodes.OK).json(users)
}