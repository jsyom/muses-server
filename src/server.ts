import 'reflect-metadata';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as logger from 'koa-logger';
import * as session from 'koa-session';
import * as passport from 'koa-passport';
import {syncDatabase} from './models';
import {APIRoutes} from './routes/api.routes';
const chalk     = require('chalk');


/*********************** SERVER ************************/
const PORT      = process.env.PORT || 3000;


// create koa app
const app       = new Koa();
const router    = new Router();

app.use(bodyParser());
app.use(json());
app.use(logger());

// register all application routes
// AppRoutes.forEach(route => router[route.method](route.path, route.action));

/************ koa-sessions ************/
app.keys        = [process.env.SECRET || 'secret'];

/* Instead of using session config we will be using jwt payload with expiration date */
app.use(session({}, app));
require('./middlewares/authentication/passport-strategies');
import {JsonWebTokenStrategy} from './middlewares/authentication/jwt-strategy';
passport.use(JsonWebTokenStrategy);
app.use(passport.initialize());
app.use(passport.session());




// 401 handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // console.log(chalk.bold.blue(`401 handling middleware`), err);
    ctx.status = err.status || 500;
    ctx.body = err;
    ctx.app.emit('error', err, ctx);
  }
});

/************ routes ************/
// curl -X GET -H 'Authorization: Bearer INSERT_TOKEN_HERE'
router.get('/api/v1', async ctx => {
  ctx.body = await `Hello ${JSON.stringify(ctx.state.user)}`;
});
app.use(APIRoutes.routes());
app.use(router.routes());
app.use(router.allowedMethods());

router.get('*', async (ctx, next) => {
  ctx.throw(404)
});

/*********************** SERVER ************************/
const forceSync = bool => ({ force: bool });
export const server = () => app.listen(PORT, () => {
  console.log(chalk.bold.blue(`Listening On Port ${PORT}`));
});

// if we are not using this file to use exported server() method
// anywhere else, we should remove this if wrapper.
if (module === require.main) {
  syncDatabase(forceSync(false)).then(server).catch(err => {
    console.log('ERR: ', err);
  });
}
