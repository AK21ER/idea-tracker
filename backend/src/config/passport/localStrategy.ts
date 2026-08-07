import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../../models/users';

export const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await User.authenticateUser(email, password);
      return done(null, user);
    } catch (err) {
      return done(null, false, { message: (err as Error).message });
    }
  }
);