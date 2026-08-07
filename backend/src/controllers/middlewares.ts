import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { IUserDocument } from '../models/users/types';
import { ROLES } from '../utils/constants';
import { APIError } from '../errors/APIError';

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: Error, user: IUserDocument | false) => {
      if (err) return next(err);
      if (!user) return next(new APIError('Unauthorized: invalid or missing token', 401));

      req.user = user;
      next();
    }
  )(req, res, next);
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user as IUserDocument;

  if (user.role !== ROLES.ADMIN) {
    return next(new APIError('Forbidden: admin access required', 403));
  }

  next();
};