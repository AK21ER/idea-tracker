import bcrypt from 'bcryptjs';
import { Schema } from 'mongoose';
import { IUserDocument } from './types';

export const applyUserMethods = (schema: Schema) => {
  schema.pre<IUserDocument>('save', async function () {
    if (!this.password || !this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  schema.methods.comparePassword = async function (
    this: IUserDocument,
    candidatePassword: string
  ): Promise<boolean> {
    if (!this.password) return false; // Google-only users have no password to compare
    return bcrypt.compare(candidatePassword, this.password);
  };

  schema.methods.toSafeObject = function (this: IUserDocument) {
    return {
      id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
      provider: this.provider,
      createdAt: this.createdAt,
    };
  };
};