import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from '../environments';
import { User } from '../../models/users';

export const googleStrategy = new GoogleStrategy(
  {
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackUrl,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value;

      if (!email) {
        return done(new Error('Google account has no email'), false);
      }

      // 1. Already linked via googleId — straightforward
      let user = await User.findOne({ googleId: profile.id });
      if (user) return done(null, user);

      // 2. Existing local account with the same email — link it
      user = await User.findOne({ email });
      if (user) {
        user.googleId = profile.id;
        if (user.provider === 'local') {
          // Keep provider as 'local' since they still have a password too;
          // googleId being set is enough to allow Google login going forward.
        }
        await user.save();
        return done(null, user);
      }

      // 3. Brand new user, created purely via Google
      const newUser = await User.create({
        name: profile.displayName || 'Google User',
        email,
        provider: 'google',
        googleId: profile.id,
      });

      return done(null, newUser);
    } catch (err) {
      return done(err as Error, false);
    }
  }
);