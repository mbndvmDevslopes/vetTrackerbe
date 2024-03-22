import { Router } from 'express';

const router = Router();

import { checkConditionUsage } from '../controllers/conditionsCheckController';

router.get('/:id', checkConditionUsage);

export default router;
