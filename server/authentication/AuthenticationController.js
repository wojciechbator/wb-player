const Router = require('koa-router'),
    koaBody = require('koa-body')(),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    comparePassword = require('../utils/comparePasswords'),
    config = require('../config.json'),
    User = require('../users/schemas/User');

const authRouter = new Router();

authRouter.post('/register', koaBody, async (ctx, next) => {
    const registeredUser = new UserSchema(ctx.request.body);
    registeredUser.hashedPassword = bcrypt.hashSync(ctx.request.body.password, 10);
    await User.create(registeredUser)
        .then(user => {
            ctx.body = `Registered new user: ${user.fullName}`;
            ctx.status = 200;
        })
        .catch(error => {
            ctx.body = error.errmsg,
            ctx.status = 409
        })
});

authRouter.post('/login', koaBody, async (ctx, next) => {
    await User.findOne({ email: ctx.request.body.email })
        .then(user => {
            if (!user || !comparePassword(ctx.request.body.password, user.hashedPassword)) {
                ctx.status = 401;
                ctx.body = `Authentication failed, wrong credentials.`;
            } else {
                ctx.body = {
                    jwt: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, config.jwtSecret)
                }
            }
        })
        .catch(error => {
            ctx.status = 500;
            ctx.body = error;
        });
});

module.exports = authRouter;