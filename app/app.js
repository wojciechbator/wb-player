const cottage = require('cottage');
const webpack = require('webpack');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
const { createReadStream } = require('fs');
const path = require('path');
const webpackConfig = require('./webpack.config');

const app = cottage();
const compiler = webpack(webpackConfig);

app.use(devMiddleware(compiler, {
    noInfo: false,
    quiet: false,
    lazy: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    publicPath: path.resolve(__dirname, 'dist'),
    headers: { 'X-Custom-Header': 'yes' },
    stats: {
        colors: true
    }
}));
app.use(hotMiddleware(compiler, {

}));

app.get('/', async (req, res) => {
    res.type = 'html';
    res.body = await createReadStream(path.resolve(__dirname, 'index.html'));
});

app.listen(3000);                      // note: don't use "if (!module.parent)"!
