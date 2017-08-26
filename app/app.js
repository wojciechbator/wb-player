const Cottage = require('cottage');
const Webpack = require('webpack');
const middleware = require('koa-webpack');
const { createReadStream } = require('fs');
const path = require('path');
const config = require('./webpack.config');
console.log("AAAAA");
const app = new Cottage();
const compiler = Webpack(config);

app.use(middleware({
    compiler
}));

app.get('/', async (req, res) => {
    res.type = 'html';
    res.body = await createReadStream(path.resolve(__dirname, 'index.html'));
});

app.listen(3000);                      // note: don't use "if (!module.parent)"!
