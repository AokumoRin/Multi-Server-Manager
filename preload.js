// preload.js

// 모듈 선언
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("multiServerManager", {
    getServerList: async () => await ipcRenderer.invoke("getServerList"),
    getSetting: async () => await ipcRenderer.invoke("getSetting"),
    getSystemTheme: async () => await ipcRenderer.invoke("getSystemTheme"),
    updateTheme: (callback) => ipcRenderer.on("updateTheme", callback),
    openGithub: async () => await ipcRenderer.invoke("openGithub")
});