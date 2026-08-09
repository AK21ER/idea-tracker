import passport from 'passport';
import { localStrategy } from './localStrategy';
import { jwtStrategy } from './jwtStrategy';
import { googleStrategy } from './googleStrategy';
import { facebookStrategy } from './facebookStrategy';

export const registerPassportStrategies = (): void => {
  passport.use('local', localStrategy);
  passport.use('jwt', jwtStrategy);
  passport.use('google', googleStrategy);
  passport.use('facebook', facebookStrategy);
};