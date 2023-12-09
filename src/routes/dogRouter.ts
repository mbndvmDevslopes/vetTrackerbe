import { Router } from 'express';
import {
  validateDogInput,
  validateDogId,
} from '../../middleware/validationMiddleware.js';

const router = Router();

import {
  getAllDogs,
  getDog,
  createDog,
  editDog,
  deleteDog,
  editDogActiveStatus,
} from '../controllers/dogController.js';
import dogsConditionsRouter from './dogsConditionsRouter.js';

/* router.get('/', getAllDogs);
router.get('/', getDog);
router.patch('/', editDog);
router.post('/', createDog);
router.delete('/', deleteDog); */

router.use('/:dogId/dogsConditions', dogsConditionsRouter);
router.route('/').get(getAllDogs).post(validateDogInput, createDog);
router
  .route('/:id')
  .get(validateDogId, getDog)
  .patch(validateDogInput, validateDogId, editDog)

  .delete(validateDogId, deleteDog);

 router.route('/:id/activeStatus').patch(editDogActiveStatus);

export default router;


// Mount the dogsConditions router as middleware for the specific path
/*


// Other dogs routes
router.route('/').get(getAllDogs).post(createDog);
router.route('/:id').get(getDog).patch(editDog).delete(deleteDog);

*/

/*
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.post('/dogs/:dogId/conditions', async (req, res) => {
  const { dogId } = req.params;
  const { conditionIds } = req.body;

  try {
    const dog = await prisma.dog.findUnique({
      where: { id: parseInt(dogId) },
    });

    if (!dog) {
      return res.status(404).json({ error: 'Dog not found' });
    }

    // Assuming you have a DogCondition model for the many-to-many relationship
    for (const conditionId of conditionIds) {
      const condition = await prisma.condition.findUnique({
        where: { id: conditionId },
      });

      if (!condition) {
        return res.status(404).json({ error: `Condition with ID ${conditionId} not found` });
      }

      // Create a new DogCondition record
      await prisma.dogCondition.create({
        data: {
          dogId: parseInt(dogId),
          conditionId,
        },
      });
    }

    return res.status(201).json({ message: 'Conditions added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
*/
// Dogs Routes
/*
app.get('/dogs/:dogId/conditions', getAllConditionsForDog);
app.post('/dogs/:dogId/conditions', addConditionToDog);
app.delete('/dogs/:dogId/conditions/:conditionId', removeConditionFromDog);

// Conditions Routes
app.get('/conditions/:conditionId/dogs', getAllDogsForCondition);
app.delete('/conditions/:conditionId/dogs/:dogId', removeDogFromCondition);
*/

// Assuming you have a DogsConditions model and appropriate Prisma functions

// Add a condition to a dog
/* app.post('/dogs/:dogId/conditions/:conditionId', async (req, res) => {
  const { dogId, conditionId } = req.params;

  // Check if the dog and condition exist
  const dogExists = await prisma.dogs.findUnique({ where: { id: dogId } });
  const conditionExists = await prisma.conditions.findUnique({ where: { id: conditionId } });

  if (!dogExists || !conditionExists) {
    return res.status(404).json({ error: 'Dog or condition not found.' });
  }

  // Add a new record to dogsConditions
  await prisma.dogsConditions.create({
    data: {
      dogId,
      conditionId,
    },
  });

  res.status(201).json({ message: 'Condition added to the dog successfully.' });
}); */

// Remove a condition from a dog
/* app.delete('/dogs/:dogId/conditions/:conditionId', async (req, res) => {
  const { dogId, conditionId } = req.params;

  // Check if the dog and condition exist
  const dogExists = await prisma.dogs.findUnique({ where: { id: dogId } });
  const conditionExists = await prisma.conditions.findUnique({ where: { id: conditionId } });

  if (!dogExists || !conditionExists) {
    return res.status(404).json({ error: 'Dog or condition not found.' });
  } */

  // Delete the record from dogsConditions
  /* await prisma.dogsConditions.delete({
    where: {
      dogId_conditionId: {
        dogId,
        conditionId,
      },
    },
  });

  res.json({ message: 'Condition removed from the dog successfully.' });
});
 */