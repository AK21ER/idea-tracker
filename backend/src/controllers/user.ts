import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { User } from '../models/users';
import { IUserDocument } from '../models/users/types';
import { signToken } from '../utils';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(409).json({ success: false, message: 'Email already in use' });
      return;
    }

    const user = await User.create({ name, email, password });
    const token = signToken(user);

    res.status(201).json({
      success: true,
      data: { user: user.toSafeObject(), token },
    });
  } catch (err) {
    next(err);
  }
};

export const login = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate(
    'local',
    { session: false },
    (err: Error, user: IUserDocument | false, info: { message?: string }) => {
      if (err) return next(err);

      if (!user) {
        res.status(401).json({ success: false, message: info?.message || 'Invalid credentials' });
        return;
      }

      const token = signToken(user);
      res.status(200).json({
        success: true,
        data: { user: user.toSafeObject(), token },
      });
    }
  )(req, res, next);
};

export const getAccount = (req: Request, res: Response): void => {
  const user = req.user as IUserDocument;
  res.status(200).json({ success: true, data: { user: user.toSafeObject() } });
};