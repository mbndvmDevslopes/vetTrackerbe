import * as express from 'express';
import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';
const router = express.Router();

import {
  getCurrentUser,
  updateUser,
  allUsers,
} from '../controllers/userController';
import { authorizePermissions } from '../../middleware/authMiddleware';

router.get('/current-user', getCurrentUser);
router.get('/admin/all-users', [authorizePermissions('admin'), allUsers]);
router.patch(
  '/update-user',
  validateRequest({
    body: z.object({
      email: z.string().email(),
      firstName: z.string(),
      lastName: z.string(),
    }),
  }),
  updateUser
);

export default router;
