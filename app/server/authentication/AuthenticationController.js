const authRouter = require('koa-router')();
const koaBody = require('koa-body')();
const userSchema = require('../users/schemas/User');
const utils = require('../utils');
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

authRouter.post('/login', koaBody, async (ctx, next) => {
  await userSchema.findOne({ email: ctx.request.body.email })
    .then(user => {
      if (!user || !utils.comparePasswords(ctx.request.body.password, user.hashedPassword)) {
        ctx.status = 401;
        ctx.body = 'Authentication failed. Wrong credentials.';
      }
      else {
        ctx.body = {
          jwt: jwt.sign({
            email: user.email,
            fullName: user.fullName
          }, config.jwtSecret),
          loggedUser: user.fullName
        };
        ctx.status = 200;
      }
    })
    .catch(error => {
      ctx.status = 500;
      throw new Error(error);
    });
});

authRouter.post('/register', koaBody, async (ctx, next) => {
  await userSchema.find({ email: ctx.request.body.email }).then(user => {
    if (user) {
      ctx.status = 409;
      ctx.body = 'Such user already exist';
    } else {
      const registeredUser = new userSchema(ctx.request.body);
      registeredUser.hashedPassword = bcrypt.hashSync(ctx.request.body.password, bcrypt.genSaltSync(10));
      userSchema.create(registeredUser)
        .then(user => {
          ctx.body = `Registered new user ${registeredUser.fullName}`;
          ctx.status = 201;
        })
        .catch(error => {
          ctx.status = 409;
          ctx.body = error.errmsg;
          throw new Error(error);
        });
    }
  }
  ).catch(error => {
    ctx.status = 500;
    throw new Error(error);
  });
});

module.exports = authRouter;