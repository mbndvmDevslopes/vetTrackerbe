import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

/* type Dog = {
  id: string;
  name: string;
  breed: string;
  sex: string; 
}; */

export const getAllDogs = async (req, res) => {
  const dogs = await prisma.dogs.findMany();
  res.send(dogs);
};

export const createDog = async (req, res) => {
  const data = req.body;
  /*  if (!data.name || !data.sex || !data.breed) {
    throw new NotFoundError('Please provide name, sex and breed');
  } */
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
  /*  if (!dog) {
    /* throw new Error('no job with that id'); */
  /* return res.status(404).json({ msg: `No dog found with ${id}` }); */
  /*  throw new NotFoundError(`No dog found with id: ${id}`);
  } */
  res.status(StatusCodes.OK).json({ dog });
};

export const editDog = async (req, res) => {
  const data = req.body;
  /* if (!data.name || !data.sex || !data.breed) {
    return res.status(400).json({ msg: 'Please provide name, sex and breed' });
  } */
  const { id } = req.params;
  /*  const dog = await prisma.dogs.findUnique({
    where: {
      id: id,
    },
  }); */
  /*  if (!dog) {
    throw new NotFoundError(`No dog found with id: ${id}`);
  } */
  const editedDog = await prisma.dogs.update({
    data,
    where: {
      id: id,
    },
  });
  res.status(StatusCodes.OK).json({ msg: 'dog changed', editedDog });
};

export const deleteDog = async (req, res) => {
  const { id } = req.params;
  const dog = await prisma.dogs.delete({
    where: {
      id: id,
    },
  });
  /*  if (!dog) {
    throw new NotFoundError(`No dog found with id: ${id}`);
  } */

  res.status(StatusCodes.OK).json({ msg: 'dog deleted', dog });
};
