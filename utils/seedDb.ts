import { readFile } from 'fs/promises';
<<<<<<< HEAD
import { Conditions, PrismaClient } from '@prisma/client';
import { DogType } from '../src/Types';

const prisma = new PrismaClient();
async function main() {
  try {
    const user = await prisma.users.findUnique({
      where: { email: 'jh@gmail.com' },
    });

=======
import { PrismaClient } from '@prisma/client';
import { Conditions, DogType } from '../src/Types';



const prisma = new PrismaClient();
async function main() {

  try {
    const user = await prisma.users.findUnique({
      where: { email: 'jh@gmail.com' },
    });
  
>>>>>>> 1e85b902226875bbc38ec610dc12576a0d7cedbb
    const jsonDogs = JSON.parse(
      await readFile(`${__dirname}/MOCK_DATADog.json`, 'utf-8')
    );
    const jsonConditions = JSON.parse(
<<<<<<< HEAD
      await readFile(`${__dirname}/MockDataConditions.json`, 'utf-8')
=======
      await readFile(`${__dirname}MOCK_DATAConditions.json`, 'utf-8')
>>>>>>> 1e85b902226875bbc38ec610dc12576a0d7cedbb
    );
    const dogs = jsonDogs.map((dog: DogType) => {
      return { ...dog, vetId: user?.id };
    });
<<<<<<< HEAD

=======
  
>>>>>>> 1e85b902226875bbc38ec610dc12576a0d7cedbb
    await prisma.dogsConditions.deleteMany({});
    await prisma.conditions.deleteMany({});
    await prisma.dogs.deleteMany({
      where: { vetId: user?.id },
    });
<<<<<<< HEAD

=======
  
>>>>>>> 1e85b902226875bbc38ec610dc12576a0d7cedbb
    await Promise.all(
      dogs.map(async (dog: DogType) => {
        await prisma.dogs.create({
          data: dog,
        });
      })
    );
<<<<<<< HEAD

=======
  
>>>>>>> 1e85b902226875bbc38ec610dc12576a0d7cedbb
    await Promise.all(
      jsonConditions.map(async (condition: Conditions) => {
        await prisma.conditions.create({
          data: condition,
        });
      })
    );
<<<<<<< HEAD

=======
  
>>>>>>> 1e85b902226875bbc38ec610dc12576a0d7cedbb
    const randomConditionIds: { id: string }[] = await prisma.$queryRaw`
      SELECT id
      FROM "Conditions"
      ORDER BY RANDOM()
      LIMIT 5
    `;
<<<<<<< HEAD
    const conditionIdsArray = randomConditionIds.map(
      (condition) => condition.id
    );

=======
    const conditionIdsArray = randomConditionIds.map((condition) => condition.id);
  
>>>>>>> 1e85b902226875bbc38ec610dc12576a0d7cedbb
    const randomDogIds: { id: string }[] = await prisma.$queryRaw`
  SELECT id
  FROM "Dogs"
  ORDER BY RANDOM()
  LIMIT 5
  `;
    const randomDogIdsArray = randomDogIds.map((dogId) => dogId.id);
<<<<<<< HEAD

    const dogsConditionsData: { conditionId: string; dogId: string }[] = [];

=======
  
    const dogsConditionsData: { conditionId: string; dogId: string }[] = [];
  
>>>>>>> 1e85b902226875bbc38ec610dc12576a0d7cedbb
    for (const dogId of randomDogIdsArray) {
      for (const conditionId of conditionIdsArray) {
        dogsConditionsData.push({
          dogId,
          conditionId,
        });
      }
    }
<<<<<<< HEAD

    await Promise.all(
      dogsConditionsData.map(async (dogCondition) => {
        await prisma.dogsConditions.create({
          data: dogCondition,
        });
      })
    );
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

=======
  
    await Promise.all(
      dogsConditionsData.map(async (dogCondition) => {
        await prisma.dogsConditions.create({
          data: dogCondition,
        });
      })
    );
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

}  
>>>>>>> 1e85b902226875bbc38ec610dc12576a0d7cedbb
main();