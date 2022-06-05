const { app, BrowserWindow, dialog} = require('electron');
const { autoUpdater } = require("electron-updater");
const ipcMain = require('electron').ipcMain;
const path = require('path');
const isDev = require('electron-is-dev');
const Store = require('electron-store');

var shell = require('electron').shell;

const { getWinSettings, saveBounds } = require('./setting');
const {HANDLE_FETCH_DATA, FETCH_DATA_FROM_STORAGE, HANDLE_SAVE_DATA, SAVE_DATA_IN_STORAGE, REMOVE_DATA_FROM_STORAGE, HANDLE_REMOVE_DATA} = require("./constants");

const storage = new Store();
//storage.delete('settings');
let mainWindow;

function createWindow() {

    const size = getWinSettings();

    mainWindow = new BrowserWindow({
          width: size[0], height: size[1],
          // minWidth: 790, 
          //minHeight: 900,
          frame: true,
          // resizable: false,
          //titleBarStyle: "hidden",
          title: `FB Scrape v${app.getVersion()}`,
          webPreferences: { nodeIntegration: true, webSecurity: false },
          icon: path.join(__dirname, './icon2.png'),
          name: ''
      });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  
  mainWindow.setMenu(null);

  mainWindow.on("close", () => {
    saveBounds(mainWindow.getSize());
    // mainWindow = null
    // app.quit();
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit()
});

// Storage / Data handling

ipcMain.handle(FETCH_DATA_FROM_STORAGE, (event, message) => {
  console.log("Main received: FETCH_DATA_FROM_STORAGE with message:", message)
  
  let data = storage.get(message, []);

  return data;
});

ipcMain.handle(SAVE_DATA_IN_STORAGE, (event, collection, newData) => {
  console.log("Main received: SAVE_DATA_IN_STORAGE")

  let data = storage.set(collection, newData);
  
  return data;
});

ipcMain.handle(REMOVE_DATA_FROM_STORAGE, (event, collection, newData) => {
  console.log('Main Received: REMOVE_DATA_FROM_STORAGE')

  let data = storage.set(collection, newData);
  
  return data;
});
