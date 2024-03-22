import { Router } from 'express';
import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';
const router = Router();

import { login, logout, register } from '../controllers/authController';
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { msg: 'IP rate limit exceeded,retry in 15 minutes' },
});
router.post(
  '/register',
  apiLimiter,
  validateRequest({
    body: z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      password: z.string(),
    }),
  }),
  register
);
router.post(
  '/login',
  apiLimiter,
  validateRequest({
    body: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
  }),
  login
);
router.get('/logout', logout);

export default router;
