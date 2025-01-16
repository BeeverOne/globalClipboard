const electron = require("electron");
const { app, BrowserWindow, ipcMain, dialog } = electron;
const path = require("path");
const fs = require("fs");
const { error, log } = require("console");

let win;
//What to do when the app is ready
app.on("ready", () => {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "./preload.js"),
    },
  });
  win.loadFile("./index.html");
});

ipcMain.on("save", (event, text) => {
  console.log(text);
  dialog.showSaveDialog(win, { defaultPath: "filename.txt" }, (fullPath) => {
    if (fullPath) {
      fs.writeFile(fullPath, text, (err) => {
        if (err) {
          console.log("There was an error", err);
        } else {
          console.log("File has been saved");
        }
      });
    }
  });
});
