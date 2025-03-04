// main.js

// 모듈 선언
const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");
const ini = require("ini");

// ipcHandlers 설정
require("./ipcHandlers");

// 상수 선언
const userDataFolderPath = path.join(app.getPath("userData"));

// 변수 선언
let mainWindow;

// createWindow - 윈도우 생성
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js")
        },
        resizable: false,
        autoHideMenuBar: true
    });

    mainWindow.loadFile(path.join(__dirname, "public", "index.html"));

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    // 저장 파일 경로
    const savesFilePath = path.join(userDataFolderPath, "saves.ini");

    // 저장 파일이 없다면
    if (!fs.existsSync(savesFilePath)) {
        // 저장 파일 기본 형식
        const defaultSaves = {
            Program: {
                Language: "auto",
                Theme: "auto"
            }
        };

        // 저장 파일 생성
        fs.writeFileSync(savesFilePath, ini.stringify(defaultSaves));
    }

    // 서버 폴더 경로
    const serverFolderPath = path.join(userDataFolderPath, "server");

    // 서버 폴더가 없다면
    if (!fs.existsSync(serverFolderPath))
        // 서버 폴더 생성
        fs.mkdirSync(serverFolderPath);

    mainWindow.webContents.openDevTools();
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if(process.platform !== "darwin") {
        app.quit();
    }
});