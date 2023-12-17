import { Router } from 'express';

const router = Router();

import { checkConditionUsage } from '../controllers/conditionsCheckController.js';

router.get('/:id', checkConditionUsage);

export default router;
