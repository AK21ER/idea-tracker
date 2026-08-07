import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const parseValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req); /* this might return [
    {
        path: "email",
        msg: "Invalid email",
        type: "field"
    },
    {
        path: "password",
        msg: "Too short",
        type: "field"
    }
] */

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.type === 'field' ? err.path : undefined,
        message: err.msg,
      })),
    });
    return;
  }

  next();
};