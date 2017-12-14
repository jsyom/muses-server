import * as Router from 'koa-router';
import * as passport from 'koa-passport';
import {User} from '../models/User';
const router = new Router();

router.get('/', passport.authenticate('jwt', {session: true}),
  async ctx => {
    try {
      const users = await User.findAll();
      ctx.body = users;
    } catch (err) {
      console.log(err);
    }
  }
);

router.get('/:id', async ctx => {
  try {
    const user = await User.findById(ctx.params.id);
    if (user) {
      ctx.status = 200;
      ctx.body = user;
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: `User with id of ${ctx.params.id} not found`
      };
    }
  } catch (err) {
    console.log(err);
  }
});

export const UsersAPIRoutes = router;
