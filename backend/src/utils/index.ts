import jwt from 'jsonwebtoken';
import { config } from '../config/environments';
import { IUserDocument } from '../models/users/types'; 

export interface JwtPayload {
  id: string;
  role: 'user' | 'admin';
}

export const signToken = (user: IUserDocument): string => {
  const payload: JwtPayload = {
    id: user._id.toString(),
    role: user.role,
  };

  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  } as jwt.SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwtSecret) as JwtPayload;
};