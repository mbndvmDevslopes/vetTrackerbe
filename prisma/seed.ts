import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.dogs.deleteMany();

  const dogData = [
    {
      name: 'M',
      breed: 'toy poodle',
      sex: 'M',
      weight: 100,
      birthDate: new Date(),
      isActive: true,
      dateVisited: new Date(),
      notes: 'Max is a very good dog',
      vetId: '33ef9df6-0cfe-4b36-ac92-82b102004865',
      ownerName: 'Jeremy Schiller',
    },
    {
      name: 'Benson',
      breed: 'Poodle',
      sex: 'M',
      weight: 100,
      birthDate: new Date(),
      isActive: true,
      dateVisited: new Date(),
      notes: 'Max is a very good dog',
      vetId: '33ef9df6-0cfe-4b36-ac92-82b102004865',
      ownerName: 'Jenny Schiller',
    },

    {
      name: 'Minnie',
      breed: 'toy poodle',
      sex: 'm',
      weight: 9,
      birthDate: new Date(),
      isActive: true,
      dateVisited: new Date(),
      notes: 'Minnie will bite',
      vetId: '33ef9df6-0cfe-4b36-ac92-82b102004865',
      ownerName: 'John Jones',
    },
    {
      name: 'Milie',
      breed: 'Poodle',
      sex: 'F',
      weight: 65,
      birthDate: new Date(),
      isActive: true,
      dateVisited: new Date(),
      notes: 'Milie smiles',
      vetId: '33ef9df6-0cfe-4b36-ac92-82b102004865',
      ownerName: 'Joan Jett',
    },
  ];

  for (const dog of dogData) {
    await prisma.dogs.create({
      data: dog,
    });
  }
}

main().catch((e) => {
  console.error('Something went wrong');
  console.error(e);
});
