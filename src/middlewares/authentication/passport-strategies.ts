import * as passport from 'koa-passport';
import { User } from '../../models/User'
import {fetchUserByEmail} from '../../controllers/auth.controller';
const TwitterStrategy = require('passport-twitter').Strategy;

passport.serializeUser((user, done) => {
  console.log('passport.serializeUser');
  done(null, {
    email: user.email,
    twitterId: user.twitterId
  })
});

passport.deserializeUser((user, done) => {
  console.log('passport.deserializeUser');
  done(null, user)
});

const twitOpts = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URL,
  passReqToCallback: true,
  userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true'
};

// not getting email back from twitter
passport.use(
  new TwitterStrategy(twitOpts, async (req, token, tokenSecret, profile, done) => {
    try {
      // search for a user in db with email that matches twitters email
      // console.log("Profile: ", profile, token, tokenSecret);
      const _user: User = await fetchUserByEmail(profile.emails[0].value);
      // if a user matches in the database, then the user already exists

      // console.log('_user', _user, req, token, tokenSecret, profile.emails);
      let user;
      if (_user) {
        // console.log('user already exists, sign them in');
        // update token but if username and profileImg exist use previous data values
        user = await _user.update({
          twitterToken: token,
          username: _user.username ? _user.username : profile.username,
          profileImg: _user.profileImg ? _user.profileImg : profile.profile_image_url
        }, {
          where: { email: profile.emails[0].value }
        });
        return done(null, user);
      }

      // Todo: For dev it is okay to create new user with twitter oAuth, but we will need to save website configuration as json,
      //       such as "allowOAuthSignIn = true" or something.

      // if we dont mind a match, create a new user
      user = await User.create({
        email: profile.emails[0].value,
        twitterId: profile.id,
        twitterToken: token,
        username: profile.username,
        profileImg: profile.profile_image_url
      });
      console.log('creating new user that has the email value sent back from twitter');
      return done(null, user)
    } catch (err) {
      console.log(err)
      // do we catch like this?
      return done(null, false)
    }
  })
);
