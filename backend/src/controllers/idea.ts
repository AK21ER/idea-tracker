import { Request, Response, NextFunction } from 'express';
import { Idea } from '../models/ideas';
import { IUserDocument } from '../models/users/types';
import { APIError } from '../errors/APIError';
import { ROLES } from '../utils/constants';

export const createIdea = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user as IUserDocument;
    const { title, description } = req.body;

    const idea = await Idea.create({ title, description, owner: user._id });

    res.status(201).json({ success: true, data: { idea: idea.toSafeObject() } });
  } catch (err) {
    next(err);
  }
};

export const getIdeas = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user as IUserDocument;

    // Admins see everything; regular users only see their own ideas
    const filter = user.role === ROLES.ADMIN ? {} : { owner: user._id };
    const ideas = await Idea.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: { ideas: ideas.map((idea) => idea.toSafeObject()) },
    });
  } catch (err) {
    next(err);
  }
};

export const getIdeaById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user as IUserDocument;
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      throw new APIError('Idea not found', 404);
    }

    const isOwner = idea.owner.toString() === user._id.toString();
    if (!isOwner && user.role !== ROLES.ADMIN) {
      throw new APIError('You are not authorized to view this idea', 403);
    }

    res.status(200).json({ success: true, data: { idea: idea.toSafeObject() } });
  } catch (err) {
    next(err);
  }
};

export const updateIdea = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user as IUserDocument;
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      throw new APIError('Idea not found', 404);
    }

    const isOwner = idea.owner.toString() === user._id.toString();
    if (!isOwner && user.role !== ROLES.ADMIN) {
      throw new APIError('You are not authorized to modify this idea', 403);
    }

    const { title, description } = req.body;
    if (title !== undefined) idea.title = title;
    if (description !== undefined) idea.description = description;

    await idea.save();

    res.status(200).json({ success: true, data: { idea: idea.toSafeObject() } });
  } catch (err) {
    next(err);
  }
};

export const deleteIdea = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user as IUserDocument;
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      throw new APIError('Idea not found', 404);
    }

    const isOwner = idea.owner.toString() === user._id.toString();
    if (!isOwner && user.role !== ROLES.ADMIN) {
      throw new APIError('You are not authorized to delete this idea', 403);
    }

    await idea.deleteOne();

    res.status(200).json({ success: true, message: 'Idea deleted successfully' });
  } catch (err) {
    next(err);
  }
};