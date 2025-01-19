const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;
const path = require("path");

let mainWindow;

app.on("ready", () => {
  console.log("App is ready"); // Test Log

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "/preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "/index.html"));
});

ipcMain.on("save", (event, text) => {
  console.log(text);
});
