import { Router } from 'express';
const router = Router();

import { login, logout, register } from '../controllers/authController';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../../middleware/validationMiddleware';
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { msg: 'IP rate limit exceeded,retry in 15 minutes' },
});

router.post('/register', apiLimiter, validateRegisterInput, register);
router.post('/login', apiLimiter, validateLoginInput, login);
router.get('/logout', logout);

export default router;
