import * as express from 'express';
const router = express.Router();

import {
  getCurrentUser,
  updateUser,
  allUsers,
} from '../controllers/userController.js';
import { validateUpdateUserInput } from '../../middleware/validationMiddleware.ts';
import { authorizePermissions } from '../../middleware/authMiddleware.ts';

router.get('/current-user', getCurrentUser);
router.get('/admin/all-users', [authorizePermissions('admin'), allUsers]); 
router.patch('/update-user', validateUpdateUserInput, updateUser);

export default router;
