const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  saveText: (text) => ipcRenderer.send("save", text),
});
