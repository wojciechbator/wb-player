const url = require('url');
const path = require('path');
const electron = require('electron');
const mongoose = require('mongoose');
const koa = require('koa');
const koaBody = require('koa-body');
const audioStream = require('./audio-stream');
const config = require('./config.json');
const presets = require('./preset/routers/presetRouter');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const input = audioStream.input;
const output = audioStream.output;

const connection = mongoose.connect("mongodb://localhost/wifi_guitar", { useMongoClient: true });

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
    });
    const app = new koa();
    app.use(koaBody());
    app.use(presets.routes());

    input.pipe(output);

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true,
        })
    );

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!mainWindow) {
        createWindow();
    }
});
