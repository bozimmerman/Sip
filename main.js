const { app, BrowserWindow, contextBridge, ipcMain, dialog, session } = require('electron');
app.commandLine.appendSwitch('gtk-version', '3');
const path = require('path');
require('net')
require('fs')
const remoteMain = require('@electron/remote/main');
remoteMain.initialize();

function createWindow() 
{
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  win.loadFile('index.html');
  win.setMenu(null);
  remoteMain.enable(win.webContents);

  const isDebug = process.argv.includes('--dev');
  if (isDebug) {
    win.webContents.openDevTools();
  }
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => 
  {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Access-Control-Allow-Origin': ['*']
      }
    });
  });
}

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  event.preventDefault();
  callback(true);
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});