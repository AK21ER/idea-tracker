import { Document, Types } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
  comparePassword(candidatePassword: string): Promise<boolean>;
  toSafeObject(): Partial<IUser> & { id: Types.ObjectId };
}

export interface IUserModel extends Document {
  authenticateUser(email: string, password: string): Promise<IUserDocument>;
}