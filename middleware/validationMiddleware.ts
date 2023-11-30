import { body, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customError.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const withValidationErrors = (validateValues) => {
  return [
    ...validateValues,
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('no dog')) {
          throw new NotFoundError(errorMessages[0]);
        }
        if (errorMessages[0].startsWith('access not')) {
          throw new UnauthorizedError(errorMessages[0]);
        }
        throw new BadRequestError(errorMessages.join(','));
      }
      next();
    },
  ];
};
export const validateDogInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required').trim(),
  body('breed').notEmpty().withMessage('breed is required').trim(),
  body('sex').notEmpty().withMessage('sex is required').trim(),
  body('birthDate')
    .notEmpty()
    .withMessage('birthDate is required')
    .trim()
    .isISO8601()
    .toDate()
    .withMessage('birthDate must be a date'),
  body('weight')
    .notEmpty()
    .withMessage('weight is required')
    .isNumeric()
    .withMessage('weight must be a number')
    .trim()
    .toInt(),
  body('dateVisited')
    .notEmpty()
    .withMessage('dateVisited is required')
    .trim()
    .isISO8601()
    .toDate()
    .withMessage('dateVisited must be a date'),
  /* body('vetId').notEmpty().withMessage('vetId is required').trim(), */
  body('ownerName').notEmpty().withMessage('ownerName is required').trim(),
]);

export const validateDogId = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidId = typeof value === 'string';
    if (!isValidId) throw new BadRequestError('invalid id');
    const dog = await prisma.dogs.findUnique({
      where: {
        id: value,
      },
    });

    if (!dog) throw new NotFoundError(`no dog with id: ${value}`);

    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === dog.vetId;
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError('access not authorized');
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body('firstName').notEmpty().withMessage('first name is required').trim(),
  body('lastName').notEmpty().withMessage('last name is required').trim(),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .trim()
    .custom(async (email) => {
      const existingEmail = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });
      if (existingEmail) {
        throw new BadRequestError('email already exists');
      }
    }),
  body('password').notEmpty().withMessage('password is required').trim(),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .trim(),
  body('password').notEmpty().withMessage('password is required').trim(),
]);

export const validateUpdateUserInput = withValidationErrors([
  body('firstName').notEmpty().withMessage('first name is required').trim(),
  body('lastName').notEmpty().withMessage('last name is required').trim(),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .trim()
    .custom(async (email, { req }) => {
      const user = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });
      if (user && user.id !== req.user.userId) {
        throw new BadRequestError('email already exists');
      }
    }),
]);