import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllConditions = async (_: Request, res: Response) => {
  const dogs = await prisma.conditions.findMany();
  res.send(dogs);
};

export const createCondition = async (req: Request, res: Response) => {
  const data = req.body;
  const newCondition = await prisma.conditions.create({
    data,
  });
  res.status(StatusCodes.CREATED).json({ msg: 'data received', newCondition });
};

export const deleteCondition = async (req: Request, res: Response) => {
  const { id } = req.params;
  const condition = await prisma.conditions.delete({
    where: {
      id: id,
    },
  });

  res.status(StatusCodes.OK).json({ msg: 'condition deleted', condition });
};
