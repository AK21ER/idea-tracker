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


export const oauthCallback = (req: Request, res: Response): void => {
  const user = req.user as IUserDocument;
  const token = signToken(user);

  res.status(200).json({
    success: true,
    data: { user: user.toSafeObject(), token },
  });
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: { users: users.map((u) => u.toSafeObject()) },
    });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new APIError('User not found', 404);
    }

    res.status(200).json({ success: true, data: { user: user.toSafeObject() } });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new APIError('User not found', 404);
    }

    const { name, email, role, password } = req.body;

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (role !== undefined) user.role = role;
    if (password !== undefined) user.password = password; // pre('save') hook re-hashes automatically

    await user.save();

    res.status(200).json({ success: true, data: { user: user.toSafeObject() } });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const requestingUser = req.user as IUserDocument;

    if (requestingUser._id.toString() === req.params.id) {
      throw new APIError('You cannot delete your own account via this endpoint', 400);
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      throw new APIError('User not found', 404);
    }

    await user.deleteOne();

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};