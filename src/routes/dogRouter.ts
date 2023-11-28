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
} from '../controllers/dogController.js';

/* router.get('/', getAllDogs);
router.get('/', getDog);
router.patch('/', editDog);
router.post('/', createDog);
router.delete('/', deleteDog); */
router.route('/').get(getAllDogs).post(validateDogInput, createDog);
router
  .route('/:id')
  .get(validateDogId, getDog)
  .patch(validateDogInput, validateDogId, editDog)
  .delete(validateDogId, deleteDog);

export default router;
