import { Router } from 'express';

const router = Router();

import { checkConditionUsage } from '../controllers/conditionsCheckController.ts';

router.get('/:id', checkConditionUsage);

export default router;
