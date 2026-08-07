import bcrypt from 'bcryptjs';
import { Schema } from 'mongoose';
import { IUserDocument } from './types';

export const applyUserMethods = (schema: Schema) => {
  // Hash password before saving, but only if it changed
  schema.pre('save', async function (this: IUserDocument, next: any) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  // Instance method: compare a plaintext password against the stored hash
  schema.methods.comparePassword = async function (
    this: IUserDocument,
    candidatePassword: string
  ): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  };

  // Instance method: return a safe, public-facing version of the user
  schema.methods.toSafeObject = function (this: IUserDocument) {
    return {
      id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
    };
  };
};