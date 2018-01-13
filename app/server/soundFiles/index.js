const fs = require('fs');
const path = require('path');
const util = require('util');
const router = require('koa-router');

const readDirAsync = util.promisify(fs.readdir);
const files = new router();
const soundFilesFolder = path.resolve(__dirname + '/../../sound_files');

files.get('/soundFiles', async (ctx, next) => {
    ctx.body = await readDirAsync(soundFilesFolder, {encoding: 'utf8'});
});

module.exports = files;