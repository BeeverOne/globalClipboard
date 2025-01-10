const electron = require("electron");
const { app, BrowserWindow } = electron;

//What to do when the app is ready
app.on("ready", () => {
  let win = new BrowserWindow({});
  win.loadFile("./index.html");
});
