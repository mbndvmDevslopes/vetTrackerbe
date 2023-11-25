import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

type Dog = {
  id: string;
  name: string;
  breed: string;
  sex: string;
};

let dogs: Dog[] = [
  {
    id: nanoid(),

    sex: 'M',
    name: 'Clement',
    breed: 'poodle',
  },
  {
    id: nanoid(),

    sex: 'M',
    name: 'Saxon',
    breed: 'Poodle',
  },
];

export const getAllDogs = async (req, res) => {
  const dogs = await prisma.dogs.findMany();
  res.send(dogs);
};

export const createDog = async (req, res) => {
  const data = req.body;
  if (!data.name || !data.sex || !data.breed) {
    return res.status(400).json({ msg: 'Please provide name, sex and breed' });
  }
  const newDog = await prisma.dogs.create({
    data,
  });
  res.status(201).json({ msg: 'data received', newDog });
};

export const getDog = async (req, res) => {
  const { id } = req.params;
  const dog = await prisma.dogs.findUnique({
    where: {
      id: id,
    },
  });
  if (!dog) {
    throw new Error('no job with that id');
    return res.status(404).json({ msg: `No dog found with ${id}` });
  }
  res.status(200).json({ dog });
};

export const editDog = async (req, res) => {
  const data = req.body;
  if (!data.name || !data.sex || !data.breed) {
    return res.status(400).json({ msg: 'Please provide name, sex and breed' });
  }
  const { id } = req.params;
  const dog = await prisma.dogs.findUnique({
    where: {
      id: id,
    },
  });
  if (!dog) {
    return res.status(404).json({ msg: `No dog found with ${id}` });
  }
  /* dog.breed = data.breed;
  dog.name = data.name;
  dog.sex = data.sex; */
  const editedDog = await prisma.dogs.update({
    data,
    where: {
      id: id,
    },
  });
  res.status(200).json({ msg: 'dog changed', editedDog });
};

export const deleteDog = async (req, res) => {
  const { id } = req.params;
  const dog = await prisma.dogs.delete({
    where: {
      id: id,
    },
  });
  if (!dog) {
    return res.status(404).json({ msg: `No dog found with id of ${id}` });
  }

  res.status(200).json({ msg: 'dog deleted' });
};
