import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();



export const getDogsConditions = async (req: Request, res: Response) => {
  const { dogId } = req.params;

  try {
    const dogsConditions = await prisma.dogsConditions.findMany({
      where: {
        dogId,
      },
    });

    return res.json(dogsConditions);
  } catch (error) {
    console.error('Error retrieving dogsConditions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateDogConditions = async (req: Request, res: Response) => {
  const { dogId } = req.params;
  const { conditionIds } = req.body;

  const existingDog = await prisma.dogs.findUnique({
    where: {
      id: dogId,
    },
  });
  if (!existingDog) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: 'dog does not exist' });
  }

  await prisma.dogsConditions.deleteMany({
    where: {
      dogId,
    },
  });

  const dogsConditionsData = conditionIds.map((conditionId: string) => ({
    dogId,
    conditionId,
  }));

  const createdDogsConditions = await prisma.$transaction(
    dogsConditionsData.map((data) => prisma.dogsConditions.create({ data }))
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: 'dog conditions updated', createdDogsConditions });
};

export const deleteAllDogsConditions = async (req: Request, res: Response) => {
  const { dogId } = req.params;
  /*   try {
    await prisma.dogsConditions.deleteMany({
      where: {
        dogId: dogId,
      },
    });
    res.status(StatusCodes.OK).json({ msg: 'dogsConditions deleted for dog' });
  } catch (error) {
    console.error('Error deleting dogsConditions:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  } */

  await prisma.dogsConditions.deleteMany({
    where: {
      dogId: dogId,
    },
  });
  res.status(StatusCodes.OK).json({ msg: 'dogsConditions deleted for dog' });
};

export const createDogsConditions = async (req: Request, res: Response) => {
  const { dogId } = req.params;
  const conditionIds = req.body.selectedConditions;
  console.log(typeof conditionIds);
  console.log('condition ids', conditionIds);
  const createMany = conditionIds.map((conditionId: string) => ({
    conditionId,
    dogId,
  }));
  console.log(createMany);
  const createdDogsConditions = await prisma.$transaction(
    createMany.map((data) =>
      prisma.dogsConditions.create({
        data,
      })
    )
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: 'dog conditions created', createdDogsConditions });
};


/*
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const checkIfDogExists = async (dogId: string) => {
  return await prisma.dogs.findUnique({
    where: {
      id: dogId,
    },
  });
};

const deleteExistingDogConditions = async (dogId: string) => {
  await prisma.dogsConditions.deleteMany({
    where: {
      dogId,
    },
  });
};

const createNewDogConditions = async (dogId: string, conditionIds: string[]) => {
  const dogsConditionsData = conditionIds.map((conditionId: string) => ({
    dogId,
    conditionId,
  }));

  return await prisma.$transaction(
    dogsConditionsData.map((data) => prisma.dogsConditions.create({ data }))
  );
};

export const updateDogConditions = async (req: Request, res: Response) => {
  const { dogId } = req.params;
  const { conditionIds } = req.body;

  try {
    const existingDog = await checkIfDogExists(dogId);
    if (!existingDog) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: 'dog does not exist' });
    }

    await deleteExistingDogConditions(dogId);

    const createdDogsConditions = await createNewDogConditions(
      dogId,
      conditionIds
    );

    res
      .status(StatusCodes.OK)
      .json({ msg: 'dog conditions updated', createdDogsConditions });
  } catch (error) {
    console.error('Error updating dog conditions:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

*/
/*
// Import necessary modules and Prisma client
import { Request, Response } from 'express';



// Retrieve all dogsConditions for a specific dog
export const getDogsConditions = async (req: Request, res: Response) => {
  const { dogId } = req.params;

  try {
    const dogsConditions = await prisma.dogsConditions.findMany({
      where: {
        dogId,
      },
    });

    return res.json(dogsConditions);
  } catch (error) {
    console.error('Error retrieving dogsConditions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create dogsConditions for a specific dog
export const createDogsConditions = async (req: Request, res: Response) => {
  const { dogId } = req.params;
  const { conditionIds } = req.body;

  try {
    const createMany = conditionIds.map((conditionId: string) => ({
      conditionId,
      dogId,
    }));

    const createdDogsConditions = await prisma.dogsConditions.createMany({
      data: createMany,
    });

    return res.status(201).json(createdDogsConditions);
  } catch (error) {
    console.error('Error creating dogsConditions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update dogsConditions for a specific dog
export const updateDogsConditions = async (req: Request, res: Response) => {
  const { dogId } = req.params;
  const { conditionIds } = req.body;

  try {
    // Delete existing dogsConditions for the dog
    await prisma.dogsConditions.deleteMany({
      where: {
        dogId,
      },
    });

    // Create new dogsConditions
    const createMany = conditionIds.map((conditionId: string) => ({
      conditionId,
      dogId,
    }));

    const createdDogsConditions = await prisma.dogsConditions.createMany({
      data: createMany,
    });

    return res.json(createdDogsConditions);
  } catch (error) {
    console.error('Error updating dogsConditions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete dogsConditions for a specific dog
export const deleteDogsConditions = async (req: Request, res: Response) => {
  const { dogId } = req.params;

  try {
    const deletedDogsConditions = await prisma.dogsConditions.deleteMany({
      where: {
        dogId,
      },
    });

    return res.json(deletedDogsConditions);
  } catch (error) {
    console.error('Error deleting dogsConditions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

*/
