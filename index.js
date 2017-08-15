const url = require('url');
const path = require('path');
const electron = require('electron');
const audioStream = require('./audio-stream');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const input = audioStream.input;
const output = audioStream.output;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

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
