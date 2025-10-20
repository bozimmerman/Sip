const { app, BrowserWindow, contextBridge, ipcMain, dialog } = require('electron');
app.commandLine.appendSwitch('gtk-version', '3');
const path = require('path');
require('net')
require('fs')
const remoteMain = require('@electron/remote/main');
remoteMain.initialize();

function createWindow() {
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
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});