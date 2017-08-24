const { app, BrowserWindow } = require('electron'); // www.npmjs.com/package/electron
const spawn = require('child_process').spawn;       // nodejs.org/api/child_process.html
const path = require('path');                       // nodejs.org/api/path.html

let win = null; // keep global reference to window object to avoid automatic closing on JS GC

process.env.NODE_ENV = process.env.NODE_ENV || 'production'; // default to production environment

const shouldQuit = app.makeSingleInstance(function(otherInstArgv, otherInstWorkingDir) {
    // someone tried to run a second instance, we should focus our window
    if (win != null) {
        if (win.isMinimized()) win.restore();
        win.focus();
    }
});

if (shouldQuit) app.quit();
    
const createWindow = () => {
    console.log('createWindow');
    app.server = require('./app.js');                     // instantiate Koa app
    win = new BrowserWindow({ width: 1920, height: 1080 }); // create browser window
    win.loadURL('http://localhost:3000');                 // load koa-app home page
    win.on('closed', () => { win = null; });              // dereference window object
}

app.on('ready', createWindow); // create window after Electron initialisation complete

app.on('window-all-closed', () => {               // quit when all windows are closed
    if (process.platform != 'darwin') app.quit(); // (except leave MacOS app active until Cmd+Q)
});

app.on('activate', () => { // re-recreate window when dock icon is clicked and no other windows open
    if (win == null) createWindow();                     
});

const update = (args, done) => {
    const updateExe = path.resolve(path.dirname(process.execPath), '..', 'Update.exe');
    spawn(updateExe, args, { detached: true }).on('close', done);
}
