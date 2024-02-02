import express from 'express';


import {
  createDogsConditions,
  deleteAllDogsConditions,
  getDogsConditions,
  updateDogConditions,
} from '../controllers/dogsConditionsController.js';
import {
  validateCreateDogsConditions,
  validateDeleteAllDogsConditions,
  validateUpdateDogConditions,
} from '../../middleware/validationMiddleware.js';

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
