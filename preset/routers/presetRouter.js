const presetSchema = require('../models/preset');
const router = require('koa-router');

router.get('/presets', async (req, res, next) => {
    const presets = await presetSchema.find();
    res.json(presets);
});

router.get('/presets/:id', async (req, res, next) => {
    const preset = await presetSchema.findById(req.params.id);
    res.json(preset);
});

router.get('/presets/:name', async (req, res, next) => {
    const preset = await presetSchema.find({ name: req.params.name });
    res.json(preset);
});

router.post('/presets', async )

module.exports = router;