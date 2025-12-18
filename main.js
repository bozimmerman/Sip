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
  if (isDebug)
    win.webContents.openDevTools();

}

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  event.preventDefault();
  callback(true);
});

app.whenReady().then(function() 
{
  const skipHeaders = new Set([
    'access-control-allow-origin',
    'access-control-allow-methods',
    'access-control-allow-headers',
    'access-control-allow-credentials',
    'x-frame-options',
    'content-security-policy',
    'cross-origin-embedder-policy',
    'cross-origin-opener-policy',
    'cross-origin-resource-policy'
  ]);
  const originHeaders = new Set([
    'Origin',
    'origin',
    'Referer',
    'referer'
    ]);
  let currentOrigin = '*';
  let requestedHeaders = '*';
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => 
  {
    currentOrigin = '*';
    for (const [key, value] of Object.entries(details.requestHeaders)) 
    {
      if (originHeaders.has(key)) 
      {
        const headerValue = Array.isArray(value) ? value[0] : value;
        if (headerValue && headerValue.toLowerCase().startsWith('http')) 
        {
          try {
            currentOrigin = (new URL(headerValue)).origin;
            break;
          } catch(e) {}
        }
      }
      else
      if (key.toLowerCase() === 'access-control-request-headers')
        requestedHeaders = Array.isArray(value) ? value[0] : value;
    }
    callback({ requestHeaders: details.requestHeaders });
  });
  session.defaultSession.webRequest.onHeadersReceived((details, callback) =>
  {
    const responseHeaders = {};
    for (const [key, value] of Object.entries(details.responseHeaders))
    {
      if (!skipHeaders.has(key.toLowerCase()))
        responseHeaders[key] = value;
    }
    responseHeaders['Access-Control-Allow-Origin'] = [currentOrigin];
    responseHeaders['Access-Control-Allow-Methods'] = ['*'];
    responseHeaders['Access-Control-Allow-Headers'] = [requestedHeaders];
    responseHeaders['Access-Control-Allow-Credentials'] = ['true'];

    callback({ responseHeaders });
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});