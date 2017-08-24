const Koa = require('koa');            // koa framework
const router = require('koa-router')();   // router middleware for koa
const serve = require('koa-static-server');

const app = new Koa();

app.use(serve({ rootDir: __dirname }));
app.use(router.routes());

app.listen(3000);                      // note: don't use "if (!module.parent)"!
