const Router = require('koa-router');
const koaBody = require('koa-body')();
const PresetSchema = require('./schemas/Preset');

const presetsRouter = new Router();

presetsRouter.get('/api/presets', async (ctx, next) => {
    const allPresets = await PresetSchema.find();
    ctx.body = allPresets;
});

presetsRouter.get('/api/presets/:id', async (ctx, next) => {
    const preset = await PresetSchema.find({ _id: ctx.params.id });
    ctx.body = preset;
});

presetsRouter.post('/api/presets', koaBody, async (ctx, next) => {
    const savedPreset = ctx.request.body;
    PresetSchema.create(savedPreset);
    ctx.body = `created new preset: ${savedPreset.name}`;
});

presetsRouter.put('/api/presets/:id', koaBody, async (ctx, next) => {
    const dataToUpdate = ctx.request.body;
    PresetSchema.findByIdAndUpdate(ctx.params.id, { $set: dataToUpdate })
              .then(preset => console.log(`preset updated: ${preset}`))
              .catch(error => { throw new Error(error) });
    ctx.body = `updated preset with id: ${ctx.params.id} with new data: ${JSON.stringify(dataToUpdate)}`
});

presetsRouter.delete('/api/presets/:id', async (ctx, next) => {
    PresetSchema.findById({ _id: ctx.params.id })
              .then(preset => preset.remove())
              .catch(error => { throw new Error(error) });
    ctx.body = `removed preset by id: ${ctx.params.id}`;
});

module.exports = presetsRouter;