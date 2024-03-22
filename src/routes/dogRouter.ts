import { Router } from 'express';

import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';

const router = Router();

import {
  getAllDogs,
  getDog,
  createDog,
  editDog,
  deleteDog,
  editDogActiveStatus,
} from '../controllers/dogController';
import dogsConditionsRouter from './dogsConditionsRouter';

router.use('/:dogId/dogsConditions', dogsConditionsRouter);
router
  .route('/')
  .get(getAllDogs)
  .post(
    validateRequest({
      body: z.object({
        name: z.string(),
        breed: z.string(),
        sex: z.string(),
        birthDate: z.string(),
        weight: z.number(),
        isActive: z.boolean(),
        dateVisited: z.string(),
        notes: z.string().optional(),
        updatedAt: z.string(),
        ownerName: z.string(),
      }),
    }),
    createDog
  );
router
  .route('/:id')
  .get(
    validateRequest({
      params: z.object({ id: z.string() }),
    }),
    getDog
  )
  .patch(
    validateRequest({
      body: z.object({
        name: z.string(),
        breed: z.string(),
        sex: z.string(),
        birthDate: z.string(),
        weight: z.number(),
        isActive: z.boolean(),
        dateVisited: z.string(),
        notes: z.string().optional(),

        ownerName: z.string(),
      }),
    }),
    validateRequest({
      params: z.object({
        id: z.string(),
      }),
    }),
    editDog
  )

  .delete(deleteDog);

router.route('/:id/activeStatus').patch(editDogActiveStatus);

export default router;
