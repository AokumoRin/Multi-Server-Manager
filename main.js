// main.js

// 모듈 선언
const { app, BrowserWindow, nativeTheme } = require("electron");
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

    // 설정 파일 경로
    const settingFilePath = path.join(userDataFolderPath, "setting.ini");

    // 설정 파일이 없다면
    if (!fs.existsSync(settingFilePath)) {
        // 설정 파일 기본 형식
        const defaultSetting = {
            Program: {
                Language: "auto",
                Theme: "auto"
            }
        };

        // 저장 파일 생성
        fs.writeFileSync(settingFilePath, ini.stringify(defaultSetting));
    }

    // 서버 폴더 경로
    const serverFolderPath = path.join(userDataFolderPath, "server");

    // 서버 폴더가 없다면
    if (!fs.existsSync(serverFolderPath))
        // 서버 폴더 생성
        fs.mkdirSync(serverFolderPath);

    // 언어 폴더 경로
    const languageFolderPath = path.join(userDataFolderPath, "language");

    // 서버 폴더가 없다면
    if (!fs.existsSync(languageFolderPath))
        // 서버 폴더 생성
        fs.mkdirSync(languageFolderPath);


    // 시스템 테마 변경 시
    nativeTheme.on("updated", () => {
        // 현재 저장된 테마 확인
        const theme = ini.parse(fs.readFileSync(settingFilePath, "utf-8"))["Program"]["Theme"];
        
        // 현재 저장된 테마가 자동 일 경우
        if(theme === "auto"){
            // 테마 변경 요청
            mainWindow.webContents.send("updateTheme");
        }
    });

    mainWindow.webContents.openDevTools();
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if(process.platform !== "darwin") {
        app.quit();
    }
});