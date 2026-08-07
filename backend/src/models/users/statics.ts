import { Schema } from 'mongoose';
import { IUserDocument } from './types';

export const applyUserStatics = (schema: Schema) => {
  schema.statics.authenticateUser = async function (
    email: string,
    password: string
  ): Promise<IUserDocument> {
    const user = await this.findOne({ email }).select('+password');

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    return user;
  };
};