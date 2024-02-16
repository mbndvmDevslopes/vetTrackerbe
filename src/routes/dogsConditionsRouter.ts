import express from 'express';


import {
  createDogsConditions,
  deleteAllDogsConditions,
  getDogsConditions,
  updateDogConditions,
} from '../controllers/dogsConditionsController.ts';
import {
  validateCreateDogsConditions,
  validateDeleteAllDogsConditions,
  validateUpdateDogConditions,
} from '../../middleware/validationMiddleware.ts';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .patch(validateUpdateDogConditions, updateDogConditions)
  .delete(validateDeleteAllDogsConditions, deleteAllDogsConditions);

router
  .route('/')
  .get(getDogsConditions)
  .post(validateCreateDogsConditions, createDogsConditions);

export default router;
