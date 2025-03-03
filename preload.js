// preload.js

// 모듈 선언
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("multiServerManager", {
    getServerList: async () => await ipcRenderer.invoke("getServerList"),
    openGithub: async () => await ipcRenderer.invoke("openGithub")
});