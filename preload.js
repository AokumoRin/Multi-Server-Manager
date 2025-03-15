// preload.js

// 모듈 선언
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("multiServerManager", {
    getServerList: async () => await ipcRenderer.invoke("getServerList"),
    getSetting: async () => await ipcRenderer.invoke("getSetting"),
    setSetting: async (object) => ipcRenderer.invoke("setSetting", object),
    getLanguageList: async () => ipcRenderer.invoke("getLanguageList"),
    getSystemLanguage: async () => ipcRenderer.invoke("getSystemLanguage"),
    getLanguageData: async (language) => ipcRenderer.invoke("getLanguageData", language),
    openLanguageFolder: async () => ipcRenderer.invoke("openLanguageFolder"),
    getSystemTheme: async () => await ipcRenderer.invoke("getSystemTheme"),
    updateTheme: (callback) => ipcRenderer.on("updateTheme", callback),
    openGithub: async () => await ipcRenderer.invoke("openGithub")
});