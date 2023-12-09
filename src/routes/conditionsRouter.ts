import { Router } from 'express';

const router = Router();

import {
  getAllConditions,
  createCondition,
  deleteCondition,
} from '../controllers/conditionsController.js';

/* router.get('/', getAllDogs);
router.get('/', getDog);
router.patch('/', editDog);
router.post('/', createDog);
router.delete('/', deleteDog); */
router.route('/').get(getAllConditions).post(createCondition);
router.route('/:id').delete(deleteCondition);

export default router;
