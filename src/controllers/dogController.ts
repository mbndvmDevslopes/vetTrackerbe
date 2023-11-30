import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

export const getAllDogs = async (req, res) => {
  console.log(req.user);
  const dogs = await prisma.dogs.findMany({
    where: {
      vetId: req.user.userId,
    },
  });
  res.send(dogs);
};

export const createDog = async (req, res) => {
  req.body.vetId = req.user.userId;
  const data = req.body;
  const newDog = await prisma.dogs.create({
    data,
  });
  res.status(StatusCodes.CREATED).json({ msg: 'data received', newDog });
};

export const getDog = async (req, res) => {
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
};

export const deleteDog = async (req, res) => {
  const { id } = req.params;
  const dog = await prisma.dogs.delete({
    where: {
      id: id,
    },
  });

  res.status(StatusCodes.OK).json({ msg: 'dog deleted', dog });
};
