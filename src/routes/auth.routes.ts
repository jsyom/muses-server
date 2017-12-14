import * as Router from 'koa-router';
import {User} from '../models/User';
import {logout, fetchUserToken} from '../controllers/auth.controller';
import {encodeJWT} from '../middlewares/authentication/jwt-strategy';
import * as passport from 'koa-passport'
const router = new Router();

const fetchUser = async (email) => {
  return await User.find({
    where: {
      email: email
    }
  })
};

router.post('/token', fetchUserToken);

router.get('/logout', logout);

router.get('/me', async ctx => {
  try {
    console.log('ctx.request: ', ctx.request);
    console.log('ctx.state.user', ctx.state.user);
    ctx.body = {
      message: 'WHOAMI',
      ['ctx.state.user']: ctx.state.user,
      path: ctx.path
    };
  } catch (err) {
    console.log(err);
  }
});
// route to authenticate with twitter based on matching emails
router.get('/twitter', passport.authenticate('twitter', {scope: ['include_email=true']}));

// callback route
router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }),
  // if twitter auth is successful, send back a jwt token for the newly
  // authenticated user
  // ctx.state.user is like req.user on express passport
  async ctx => {
    const { email, twitterToken } = ctx.state.user;
    /*
      Setting oauth token and consumer_key for Authorization: OAuth
      -------------------------------------------------------------
      https://developer.twitter.com/en/docs/basics/authentication/guides/authorizing-a-request
    */
    const token = encodeJWT({
      email,
      oauth_provider: 'twitter',
      oauth_token: twitterToken,
      oauth_consumer_key: process.env.TWITTER_CONSUMER_KEY
    });
    ctx.body = { token }
  }
);

export const AuthRoutes = router;
