import express from 'express';


import {
  createDogsConditions,
  deleteAllDogsConditions,
  getDogsConditions,
  updateDogConditions,
} from '../controllers/dogsConditionsController';

import { validateRequest } from 'zod-express-middleware';
import {z} from "zod";

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .patch(
    validateRequest({
      params: z.object({
        dogId: z.string(),
      }),
      body: z.object({
        conditionIds: z.array(z.string()), //array
      }),
    }),
    updateDogConditions
  )
  .delete(
    validateRequest({
      params: z.object({
        dogId: z.string(),
      }),
    }),
    deleteAllDogsConditions
  );

router
  .route('/')
  .get(getDogsConditions)
  .post(
    validateRequest({
      params: z.object({
        dogId: z.string(),
      }),
    }),
    createDogsConditions
  );

export default router;

