const Router = require('koa-router'),
    koaBody = require('koa-body')(),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    UserSchema = require('../users/schemas/User');

const authRouter = new Router();

authRouter.post('/register', koaBody, async (ctx, next) => {
    const registeredUser = new UserSchema(ctx.request.body);
    registeredUser.hashedPassword = bcrypt.hashSync(ctx.request.body.password, 10);
    await UserSchema.create(registeredUser)
        .then(user => {
            ctx.body = `Registered new user: ${user.fullName}`;
            ctx.status = 200;
        })
        .catch(error => {
            ctx.body = error.errmsg
        })
});

authRouter.post('/login', koaBody, async (ctx, next) => {
    await UserSchema.findOne({ email: ctx.request.body.email })
        .then(user => {
            if (!user.comparePassword(ctx.request.body.password)) {
                ctx.status = 401;
                ctx.body = `Authentication failed, wrong password.`;
            } else {
                ctx.body = {
                    jwt: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'SECRETMESSAGE')
                }
            }
        })
        .catch(error => {
            ctx.status = 401;
            ctx.body = error;
        });
});

module.exports = authRouter;