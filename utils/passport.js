import GoogleStrategy from 'passport-google-oauth20';

import User from '../models/user';
import Db from '../utils/db';
import { signToken } from '../utils/jwt';
import { config } from '../config/config';

const db = Db();

const googleStrategy = GoogleStrategy.Strategy;

export const serializeUser = (user, done) => {
  done(null, user);
};

export const deserializeUser = async (user, done) => {
  try {
    const userDb = await db.findUser();
    userDb.token = user.token;
    done(null, userDb);
  } catch (err) {
    return err;
  }
};

export const googleStrategyPassport = new googleStrategy(
  {
    callbackURL: '/auth/googleplus/redirect',
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const userDB = await db.findUser({ email: profile.emails[0].value });

      if (userDB && !userDB.google) {
        console.log('if ====================');
        return done({
          ok: false,
          err: {
            message: 'invalid user'
          }
        });
      }

      if (userDB && userDB.google) {
        console.log('ELSE ====================');
        const token = await signToken(userDB);

        return done(null, {
          ok: true,
          user: userDB,
          token
        });
      }

      if (!userDB) {
        let newUser = new User();
        user.name = profile.displayName;
        user.email = profile.emails[0].value;
        user.img = profile.photos[0].value;
        user.google = true;
        user.password = ':)';

        const savedUser = await db.createUser(newUser);
        const token = await signToken(savedUser);

        return done(null, {
          ok: true,
          user: userDB,
          token
        });
      }
    } catch (err) {
      return done({
        ok: false,
        err
      });
    }
  }
);
