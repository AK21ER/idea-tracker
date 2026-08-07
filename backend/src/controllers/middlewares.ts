import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { IUserDocument } from '../models/users/types';
import { ROLES } from '../utils/constants';

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

      if (!user) {
        res.status(401).json({ success: false, message: 'Unauthorized: invalid or missing token' });
        return;
      }

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
    res.status(403).json({ success: false, message: 'Forbidden: admin access required' });
    return;
  }

  next();
};