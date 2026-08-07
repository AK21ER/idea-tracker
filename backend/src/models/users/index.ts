import { model, Schema } from 'mongoose';
import { userSchema } from './schema';
import { applyUserMethods } from './methods';
import { applyUserStatics } from './statics';
import { IUserDocument, IUserModel } from './types';

applyUserMethods(userSchema);
applyUserStatics(userSchema);

export const User = model<IUserDocument, IUserModel>('User', userSchema);