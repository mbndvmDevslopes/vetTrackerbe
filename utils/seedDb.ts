import { readFile } from 'fs/promises';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

try {
  const user = await prisma.users.findUnique({
    where: { email: 'ms@gmail.com' },
  });

  const jsonDogs = JSON.parse(
    await readFile(new URL('./MOCK_DATADog.json', import.meta.url), 'utf-8')
  );
  const jsonConditions = JSON.parse(
    await readFile(new URL('MockDataConditions.json', import.meta.url), 'utf-8')
  );
  const dogs = jsonDogs.map((dog) => {
    return { ...dog, vetId: user?.id };
  });

  await prisma.dogsConditions.deleteMany({});
  await prisma.conditions.deleteMany({});
  await prisma.dogs.deleteMany({
    where: { vetId: user?.id },
  });

  await Promise.all(
    dogs.map(async (dog) => {
      await prisma.dogs.create({
        data: dog,
      });
    })
  );

  await Promise.all(
    jsonConditions.map(async (condition) => {
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

/* const data = Array.from({length:100}).map(()=> {data}) */
/* faker.animal.dog(): string
faker.animal.dog() // 'Irish Water Spaniel'faker.person.sex(): string
faker.person.sex() // 'female'
faker.person.firstName(sex?: 'female' | 'male'): string
faker.person.firstName() // 'Antwan'
faker.person.firstName('female') // 'Victoria'
faker.person.firstName('male') // 'Tom'
faker.person.lastName(sex?: 'female' | 'male'): string
faker.person.lastName() // 'Hauck'
faker.person.lastName('female') // 'Grady'
faker.person.lastName('male') // 'Barton'
faker.person.fullName()
faker.number.float(options: number | {
  max: 120,
  min: 0.5,
  precision: 0.1
} = {}): number
faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }) // '2026-05-16T02:22:53.002Z'
faker.datatype.boolean()  */
