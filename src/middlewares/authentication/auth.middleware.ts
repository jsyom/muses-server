const jwt = require('jsonwebtoken');

export const verifyToken = async (ctx, next) => {
  const token = ctx.request.body.token || ctx.request.headers['token'];
  console.log('ctx: ', ctx);
  console.log('HIT VERYIFY TOKEN MIDDLEWARE');
  if (token) {
    jwt.verify(token, process.env.SECRET, function(err, decode) {
      if (err) {
        ctx.status = 500;
        ctx.body = 'invalid token';
      } else {
        next();
      }
    });
  } else {
    ctx.body = {
      message: 'we need a token'
    };
  }
};

export const  ensureToken = async (ctx, next) => {
  console.log('HIT ENSSURE TOKEN');
  const bearerHeader = ctx.request.headers['authorization'];
  // ctx.request.headers['token'] = 'TOKENNNNNNNNNNNNNNNNNNNN';
  console.log('ctx.request.headers: ', ctx.request.headers);
  if (typeof bearerHeader !== 'undefined') {
    ctx.request.token = bearerHeader;
    await next();
  } else {
    ctx.status = 403;
    ctx.body = {
      message: 'some error'
    };
  }
};

export async function requireLogin(ctx, next) {
  if (ctx.isAuthenticated()) {
    await next()
  } else {
    ctx.status = 401
    ctx.body = {
      errors: [{ title: 'Login required', status: 401 }]
    }
  }
}
