import passport from 'passport';
import { localStrategy } from './localStrategy';
import { jwtStrategy } from './jwtStrategy';

export const registerPassportStrategies = (): void => {
  passport.use('local', localStrategy);
  passport.use('jwt', jwtStrategy);
};