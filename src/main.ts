import {app , BrowserWindow } from "electron"
import * as path from "path"
import * as isDev from "electron-is-dev"

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height:600,
    width:800,
    webPreferences:{
      preload: path.join(__dirname,"preload.js"),
    }
  })
  
  // and load the index.html of the app
  //mainWindow.loadFile(path.join(__dirname,"../index.html"))

  mainWindow.loadURL(isDev?"http://localhost:5173":path.join(__dirname,"../index.html"))

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(()=> {
  createWindow();
  app.on("activate",function() {
    if(BrowserWindow.getAllWindows().length ===0) createWindow();
  });
});

app.on("window-all-closed",() => {
  if(process.platform !=="darwin"){
    app.quit()
  }
})
