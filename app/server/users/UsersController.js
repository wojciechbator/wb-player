const Router = require('koa-router')
const koaBody = require('koa-body')()
const UserSchema = require('./schemas/User')
const utils = require('../utils')
const util = require('util')
const jwt = require('jsonwebtoken')
const config = require('../config.json')

const jwtPromisify = util.promisify(jwt.verify)
const usersRouter = new Router()

usersRouter.get('/api/users', async (ctx, next) => {
  const token = ctx.headers.authorization.split(' ')[1];
  await jwtPromisify(token, config.jwtSecret)
    .then(user => {
      UserSchema.findOne({
        email: user.email
      });
    })
    .then(async user => {
      await UserSchema.find()
        .then(users => {
          ctx.body = users;
          ctx.status = 200;
        })
        .catch(e => {
          ctx.status = 404;
          throw new Error(e);
        })
    })
    .catch(e => {
      throw new Error(e);
      ctx.status = 401;
    });
})

usersRouter.get('/api/users/:id', async (ctx, next) => {
    const user = await UserSchema.find({ _id: ctx.params.id });
    ctx.body = user;
    ctx.status = 200;
});

usersRouter.put('/api/users/:id', koaBody, async (ctx, next) => {
    const updatedUser = ctx.request.body;
    await UserSchema.findByIdAndUpdate(ctx.params.id, { $set: updatedUser })
        .then(user => {
            ctx.body = `updated user with new data: ${JSON.stringify(updatedUser)}`;
            ctx.status = 200;
        })
        .catch(error => {
            ctx.status = 404;
            throw new Error(error);
        });

});

usersRouter.delete('/api/users/:id', async (ctx, next) => {
    await UserSchema.findById({ _id: ctx.params.id })
        .then(user => {
            user.remove()
            ctx.body = `removed user by id: ${ctx.params.id}`;
            ctx.status = 204;
        })
        .catch(error => {
            ctx.status = 404;
            throw new Error(error);
        });
});

module.exports = usersRouter;