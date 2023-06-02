"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var isDev = require("electron-is-dev");
function createWindow() {
    // Create the browser window.
    var mainWindow = new electron_1.BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        }
    });
    // and load the index.html of the app
    //mainWindow.loadFile(path.join(__dirname,"../index.html"))
    mainWindow.loadURL(isDev ? "http://localhost:5173" : path.join(__dirname, "../index.html"));
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}
electron_1.app.whenReady().then(function () {
    createWindow();
    electron_1.app.on("activate", function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
//# sourceMappingURL=main.js.map