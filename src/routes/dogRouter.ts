import { Router } from 'express';
import {
  validateDogInput,
  validateDogId,
} from '../../middleware/validationMiddleware.ts';

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



router.use('/:dogId/dogsConditions', dogsConditionsRouter);
router.route('/').get(getAllDogs).post(validateDogInput, createDog);
router
  .route('/:id')
  .get(validateDogId, getDog)
  .patch(validateDogInput, validateDogId, editDog)

  .delete(validateDogId, deleteDog);

router.route('/:id/activeStatus').patch(editDogActiveStatus);

export default router;


