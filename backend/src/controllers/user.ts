import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { User } from '../models/users';
import { IUserDocument } from '../models/users/types';
import { signToken } from '../utils';
import { APIError } from '../errors/APIError';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      throw new APIError('Email already in use', 409);
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
        return next(new APIError(info?.message || 'Invalid credentials', 401));
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

export const googleCallback = (req: Request, res: Response): void => {
  const user = req.user as IUserDocument;
  const token = signToken(user);

  // Redirect to your frontend with the token, or return JSON directly
  // depending on how your frontend is built. JSON shown here for Postman testing:
  res.status(200).json({
    success: true,
    data: { user: user.toSafeObject(), token },
  });
};

export const oauthCallback = (req: Request, res: Response): void => {
  const user = req.user as IUserDocument;
  const token = signToken(user);

  res.status(200).json({
    success: true,
    data: { user: user.toSafeObject(), token },
  });
};