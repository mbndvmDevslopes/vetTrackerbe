import { Router } from 'express';

const router = Router();

import {
  getAllConditions,
  createCondition,
  deleteCondition,
} from '../controllers/conditionsController.ts';


router.route('/').get(getAllConditions).post(createCondition);
router.route('/:id').delete(deleteCondition);

export default router;
