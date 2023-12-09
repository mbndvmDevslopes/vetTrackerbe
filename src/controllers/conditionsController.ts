import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

export const getAllConditions = async (req, res) => {
  const dogs = await prisma.conditions.findMany();
  res.send(dogs);
};

export const createCondition = async (req, res) => {
  const data = req.body;
  const newCondition = await prisma.conditions.create({
    data,
  });
  res.status(StatusCodes.CREATED).json({ msg: 'data received', newCondition });
};

/* export const getDog = async (req, res) => {
  const { id } = req.params;
  const dog = await prisma.dogs.findUnique({
    where: {
      id: id,
    },
  });

  res.status(StatusCodes.OK).json({ dog });
};

export const editDog = async (req, res) => {
  const data = req.body;

  const { id } = req.params;

  const editedDog = await prisma.dogs.update({
    data,
    where: {
      id: id,
    },
  });
  res.status(StatusCodes.OK).json({ msg: 'dog updated', editedDog });
}; */

export const deleteCondition = async (req, res) => {
  const { id } = req.params;
  const condition = await prisma.conditions.delete({
    where: {
      id: id,
    },
  });

  res.status(StatusCodes.OK).json({ msg: 'condition deleted', condition });
};
