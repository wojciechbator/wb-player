const Koa = require('koa');
const router = require('koa-router')();
const Webpack = require('webpack');
const middleware = require('webpack-koa2-middleware');
const { createReadStream } = require('fs');
const path = require('path');
const config = require('../webpack.config');
const app = new Koa();
const compiler = Webpack(config);

router.get('/', async (req, res) => {
    res.type = 'html';
    res.body = await createReadStream(path.resolve(__dirname, '..', 'client', 'index.html'));
});

app.use(middleware(compiler));
app.use(router.routes())
.use(router.allowedMethods());

app.listen(3000);                      // note: don't use "if (!module.parent)"!
