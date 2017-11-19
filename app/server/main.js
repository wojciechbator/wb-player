const { app, BrowserWindow } = require('electron');
const spawn = require('child_process').spawn;
const path = require('path');
const config = require('./config.json');

let win = null;

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const shouldQuit = app.makeSingleInstance(function(otherInstArgv, otherInstWorkingDir) {
    if (win != null) {
        if (win.isMinimized()) win.restore();
        win.focus();
    }
});

if (shouldQuit) app.quit();
    
const createWindow = () => {
    app.server = require('./server');
    win = new BrowserWindow({ width: 1920, height: 1080, titleBarStyle: 'hidden', title: 'WB Player', icon: path.resolve(__dirname, '..', 'client', 'assets', 'images', 'logo.png' ) });
    win.setMenu(null);
    win.loadURL(config.localURL);
    win.on('closed', () => { win = null; });
}

app.commandLine.appendSwitch(config.fakeMediaFlag, config.enableInsecureOriginsFlag);

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit();
});

app.on('activate', () => {
    if (win == null) createWindow();                     
});

const update = (args, done) => {
    const updateExe = path.resolve(path.dirname(process.execPath), '..', 'Update.exe');
    spawn(updateExe, args, { detached: true }).on('close', done);
}
