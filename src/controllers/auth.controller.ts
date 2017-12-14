import {User, validPassword} from '../models/User';
import {encodeJWT} from '../middlewares/authentication/jwt-strategy';

function serialize(user) {
  console.log('serialize');
  return {
    data: {
      id: user.id
    }
  }
}

export async function fetchUserByEmail(email: string): Promise<User> {
  return User.find({ where: { email }})
    .then(user => (<User>user));
}

export async function fetchUserByTwitter(twitterId: number): Promise<User> {
  return User.find({ where: { twitterId }})
    .then(user => (<User>user));
}

export async function fetchUserToken(ctx) {
  const { email, password } = ctx.request.body;
  try {
    const user: User = await fetchUserByEmail(email);

    console.log(user, email, password);
    if (!user) {
      ctx.status = 401;
      return ctx.body = { errors: [{ title: 'User not found', status: 401 }]}
    }

    const matches: boolean = await validPassword(password, user.password);
    if (matches) {
      const payload = {
        email: user.email,

      };
      const token = encodeJWT(payload);
      console.log('token', token, ctx.session);
      ctx.status = 201;
      ctx.login(user).catch(console.error);

      console.log('session', ctx.session)
      return ctx.body = { token };
    } else {
      ctx.status = 401;
      return ctx.body = { errors: [{ title: 'Password does not match', status: 401 }]}
    }
  } catch (err) {
    ctx.status = 500;
    return ctx.body = { errors: [{ title: err.message, status: 500, stack: err.stack }]}
  }
}

export async function logout(ctx) {
  ctx.logout();
  ctx.status = 204;
}
