const presetSchema = require('../models/preset');
const Router = require('koa-router');

const presets = new Router();

presets.get('/presets', async (req, res, next) => {
    const presets = await presetSchema.find();
    res.json(presets);
});

presets.get('/presets/:id', async (req, res, next) => {
    const preset = await presetSchema.findById(req.params.id);
    res.json(preset);
});

presets.get('/presets/:name', async (req, res, next) => {
    const preset = await presetSchema.find({ name: req.params.name });
    res.json(preset);
});

presets.post('/presets', async (req, res, next) => {
    
});

module.exports = presets;