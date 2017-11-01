const Router = require('koa-router');
const koaBody = require('koa-body')();
const UserSchema = require('./schemas/User');

const usersRouter = new Router();

usersRouter.get('/api/users', async (ctx, next) => {
    const allPresets = await UserSchema.find();
    ctx.body = allPresets;
    ctx.status = 200;
});

usersRouter.get('/api/users/:id', async (ctx, next) => {
    const preset = await UserSchema.find({ _id: ctx.params.id });
    ctx.body = preset;
    ctx.status = 200;
});

usersRouter.put('/api/users/:id', koaBody, async (ctx, next) => {
    const updatedUser = ctx.request.body;
    await UserSchema.findByIdAndUpdate(ctx.params.id, { $set: updatedUser })
              .then(preset => console.log(`preset updated: ${updatedUser}`))
              .catch(error => { throw new Error(error) });
    ctx.body = `updated user with new data: ${JSON.stringify(updatedUser)}`;
    ctx.status = 200;    
});

usersRouter.delete('/api/users/:id', async (ctx, next) => {
    await UserSchema.findById({ _id: ctx.params.id })
              .then(preset => preset.remove())
              .catch(error => { throw new Error(error) });
    ctx.body = `removed preset by id: ${ctx.params.id}`;
    ctx.status = 200;    
});

module.exports = usersRouter;