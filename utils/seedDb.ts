import { readFile } from 'fs/promises';
import { PrismaClient } from '@prisma/client';
import { DogType, Conditions } from 'src/Types.ts';


const prisma = new PrismaClient();

try {
  const user = await prisma.users.findUnique({
    where: { email: 'jh@gmail.com' },
  });

  const jsonDogs = JSON.parse(
    await readFile(new URL('./MOCK_DATADog.json', import.meta.url), 'utf-8')
  );
  const jsonConditions = JSON.parse(
    await readFile(new URL('MockDataConditions.json', import.meta.url), 'utf-8')
  );
  const dogs = jsonDogs.map((dog: DogType) => {
    return { ...dog, vetId: user?.id };
  });

  await prisma.dogsConditions.deleteMany({});
  await prisma.conditions.deleteMany({});
  await prisma.dogs.deleteMany({
    where: { vetId: user?.id },
  });

  await Promise.all(
    dogs.map(async (dog: DogType) => {
      await prisma.dogs.create({
        data: dog,
      });
    })
  );

  await Promise.all(
    jsonConditions.map(async (condition: Conditions) => {
      await prisma.conditions.create({
        data: condition,
      });
    })
  );

  const randomConditionIds: { id: string }[] = await prisma.$queryRaw`
    SELECT id
    FROM "Conditions"
    ORDER BY RANDOM()
    LIMIT 5
  `;
  const conditionIdsArray = randomConditionIds.map((condition) => condition.id);

  const randomDogIds: { id: string }[] = await prisma.$queryRaw`
SELECT id
FROM "Dogs"
ORDER BY RANDOM()
LIMIT 5
`;
  const randomDogIdsArray = randomDogIds.map((dogId) => dogId.id);

  const dogsConditionsData: { conditionId: string; dogId: string }[] = [];

  for (const dogId of randomDogIdsArray) {
    for (const conditionId of conditionIdsArray) {
      dogsConditionsData.push({
        dogId,
        conditionId,
      });
    }
  }

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

