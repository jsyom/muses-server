import * as passportJWT from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import {fetchUserByEmail} from '../../controllers/auth.controller';
import {User} from '../../models/User';
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const config = {
  jwtSecret: 'secret',
  jwtSession: {
    session: true
  },
  jwtOptions: {
    expiresIn: '30m'
  }
};
const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

export const JsonWebTokenStrategy = new Strategy(params, async (payload, done) => {
  console.log('JsonWebTokenStrategy', payload);
  const user: User = await fetchUserByEmail(payload.email);
  if (user) {
    return done(null, {
      email: user.email,
      twitterId: user.twitterId,
      twitterToken: user.twitterToken,
    });
  } else {
    return done(new Error('User not found'), null);
  }
});

export function encodeJWT(payload) {
  return jwt.sign(payload, config.jwtSecret, config.jwtOptions);
}
