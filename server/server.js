const Koa = require('koa');
const router = require('koa-router')();
const Webpack = require('webpack');
const mongoose = require('mongoose');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
const { createReadStream } = require('fs');
const path = require('path');
const config = require('../webpack.config');
const app = new Koa();
const compiler = Webpack(config);
const presetsRouter = require('./presets/PresetsController');
const filesSender = require('./soundFiles');
const AudioWebsocket = require('./audioWebsocket');

const dbUrl = 'mongodb://localhost/wifi-guitar';

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl).then(
    () => console.log(`Connected to database on url: ${dbUrl}`),
    (error) => { throw new Error(error); }
);


router.get('/', async (req, res) => {
    res.type = 'html';
    res.body = await createReadStream(path.resolve(__dirname, '..', 'client', 'index.html'));
});

app.use(devMiddleware(compiler, {
    headers: { 'X-Custom-Header': 'yes' },
    stats: {
        colors: true
    }
}));
app.use(hotMiddleware(compiler, {}));
app.use(presetsRouter.routes());
app.use(filesSender.routes());

app.use(router.routes())
.use(router.allowedMethods());

const server = app.listen(3000);

const webSocketServer = new AudioWebsocket(server);