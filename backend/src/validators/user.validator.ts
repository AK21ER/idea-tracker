import { body, param } from 'express-validator';
import { PASSWORD_STRENGTH_REGEX, PASSWORD_STRENGTH_MESSAGE } from '../utils/constants';

export const registerValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
    .matches(PASSWORD_STRENGTH_REGEX).withMessage(PASSWORD_STRENGTH_MESSAGE),
];

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required'),
];

export const userIdValidator = [
  param('id').isMongoId().withMessage('Invalid user ID'),
];

export const updateUserValidator = [
  param('id').isMongoId().withMessage('Invalid user ID'),

  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Must be a valid email address')
    .normalizeEmail(),

  body('role')
    .optional()
    .isIn(['user', 'admin']).withMessage('Role must be either "user" or "admin"'),

  body('password')
    .optional()
    .matches(PASSWORD_STRENGTH_REGEX).withMessage(PASSWORD_STRENGTH_MESSAGE),
];