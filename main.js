const { app, BrowserWindow, contextBridge, ipcMain, dialog, session, webFrameMain } = require('electron');
app.commandLine.appendSwitch('gtk-version', '3');
const path = require('path');
require('net')
require('fs')
const remoteMain = require('@electron/remote/main');
remoteMain.initialize();
const pendingInjections = new Map();

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
  win.webContents.on('did-frame-navigate', function(event, url, httpResponseCode, httpStatusText, isMainFrame, frameProcessId, frameRoutingId) 
  {
    if (!isMainFrame && pendingInjections.has(url)) 
    {
      const injection = pendingInjections.get(url);
      const frame = webFrameMain.fromId(frameProcessId, frameRoutingId);
      
      if (frame) 
      {
        frame.executeJavaScript(injection.code)
          .then(function(){
            pendingInjections.delete(url);
          })
          .catch(function(err){});
      }
    }
  });

  const isDebug = process.argv.includes('--dev');
  if (isDebug)
    win.webContents.openDevTools();

}

app.on('certificate-error', function(event, webContents, url, error, certificate, callback) {
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
  ipcMain.on('webview-inject-request', (event, data) => {
    pendingInjections.set(data.url, {
      iframeId: data.iframeId,
      code: data.code,
      webContentsId: event.sender.id
    });
  });
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});