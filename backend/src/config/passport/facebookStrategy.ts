import { Strategy as FacebookStrategy } from 'passport-facebook';
import { config } from '../environments';
import { User } from '../../models/users';

export const facebookStrategy = new FacebookStrategy(
  {
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackUrl,
    profileFields: ['id', 'displayName', 'emails'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value;

      if (!email) {
        return done(new Error('Facebook account has no email'), false);
      }

      let user = await User.findOne({ facebookId: profile.id });
      if (user) return done(null, user);

      user = await User.findOne({ email });
      if (user) {
        user.facebookId = profile.id;
        await user.save();
        return done(null, user);
      }

      const newUser = await User.create({
        name: profile.displayName || 'Facebook User',
        email,
        provider: 'facebook',
        facebookId: profile.id,
      });

      return done(null, newUser);
    } catch (err) {
      return done(err as Error, false);
    }
  }
);