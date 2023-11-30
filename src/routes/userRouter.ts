import * as express from 'express';
const router = express.Router();

import {
  getCurrentUser,
  updateUser,
  getStats,
} from '../controllers/userController.js';
import { validateUpdateUserInput } from '../../middleware/validationMiddleware.js';
import { authorizePermissions } from '../../middleware/authMiddleware.js';

router.get('/current-user', getCurrentUser);
router.get('/admin/stats', [authorizePermissions('admin'), getStats]);
router.patch('/update-user', validateUpdateUserInput, updateUser);

export default router;
