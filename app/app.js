const cottage = require('cottage');            // koa framework
const serve = require('koa-static-server');
const streamData = require('./audio-stream/index');

const app = cottage();

app.use(streamData());
app.use(serve({ rootDir: __dirname }));

app.listen(3000);                      // note: don't use "if (!module.parent)"!
