const Koa = require('koa');
const router = require('koa-router')();
const Webpack = require('webpack');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
const { createReadStream } = require('fs');
const path = require('path');
const config = require('../webpack.config');
const app = new Koa();
const compiler = Webpack(config);

const AudioWebsocket = require('./audio-websocket');

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

app.use(router.routes())
    .use(router.allowedMethods());

const server = app.listen(3000);                      // note: don't use "if (!module.parent)"!

const webSocketServer = new AudioWebsocket(server);