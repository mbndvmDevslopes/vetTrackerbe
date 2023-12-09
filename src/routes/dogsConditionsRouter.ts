import express from 'express';

/* const router = Router(); */

import {
  createDogsConditions,
  deleteAllDogsConditions,
  getDogsConditions,
  updateDogConditions,
} from '../controllers/dogsConditionsController.js';
const router = express.Router({ mergeParams: true });

/* router.get('/', getAllDogs);
router.get('/', getDog);
router.patch('/', editDog);
router.post('/', createDog);
router.delete('/', deleteDog); */

router.route('/:id').patch(updateDogConditions).delete(deleteAllDogsConditions);

router.route('/').get(getDogsConditions).post(createDogsConditions);

export default router;
// routes/dogsConditionsRoutes.js

/* import {
  getDogsConditions,
  createDogsConditions,
  updateDogsConditions,
  deleteDogsConditions,
} from '../controllers/dogsConditionsController';

const router = Router();

router
  .route('/dogsConditions')
  .get(getDogsConditions)
  .post(createDogsConditions);
router
  .route('/dogsConditions/:dogId')
  .patch(updateDogsConditions)
  .delete(deleteDogsConditions);
 */
// dogsConditionsRoute.ts
/*
import express from 'express';
import {
  getDogsConditions,
  createDogsConditions,
  updateDogsConditions,
  deleteDogsConditions,
} from '../controllers/dogsConditionsController';

const router = express.Router({ mergeParams: true });

// GET /dogs/:dogId/conditions
router.get('/', getDogsConditions);

// POST /dogs/:dogId/conditions
router.post('/', createDogsConditions);

// PATCH /dogs/:dogId/conditions
router.patch('/', updateDogsConditions);

// DELETE /dogs/:dogId/conditions
router.delete('/', deleteDogsConditions);

export default router;
*/
