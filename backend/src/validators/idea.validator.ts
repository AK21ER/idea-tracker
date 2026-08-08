import { body, param } from 'express-validator';

export const createIdeaValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 2, max: 150 }).withMessage('Title must be between 2 and 150 characters'),

  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 2, max: 2000 }).withMessage('Description must be between 2 and 2000 characters'),
];

export const updateIdeaValidator = [
  param('id').isMongoId().withMessage('Invalid idea ID'),

  body('title')
    .optional()
    .trim()
    .isLength({ min: 2, max: 150 }).withMessage('Title must be between 2 and 150 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 2, max: 2000 }).withMessage('Description must be between 2 and 2000 characters'),
];

export const ideaIdValidator = [
  param('id').isMongoId().withMessage('Invalid idea ID'),
];