// ipcHandlers.js

// 모듈 선언
const { app, ipcMain, dialog, shell, nativeTheme } = require("electron");
const path = require("path");
const fs = require("fs");
const ini = require("ini");

// 상수 선언
const userDataFolderPath = path.join(app.getPath("userData"));

// getServerList - 서버 목록 불러오기
ipcMain.handle("getServerList", async (_event) => {
    // 상수 선언
    const result = [];

    // 서버 폴더 경로
    const serverFolderPath = path.join(userDataFolderPath, "server");

    // 서버 폴더 목록
    const serverFolderList = fs.readdirSync(serverFolderPath).filter(element => {
        const elementPath = path.join(serverFolderPath, element);
        return fs.statSync(elementPath).isDirectory();
    });

    // 서버 정보 가져오기
    serverFolderList.map((element) => {
        // 서버 폴더 정보 경로
        const serverFolderInfoPath = path.join(serverFolderPath, element, "setting.json");

        let serverFolderInfo;

        try {
            // 서버 폴더 정보 읽기
            serverFolderInfo = JSON.parse(fs.readFileSync(serverFolderInfoPath));

            // 결과 배열에 정보 추가
            result.push({
                icon: serverFolderInfo.icon,
                name: serverFolderInfo.name,
                version: serverFolderInfo.version,
                type: serverFolderInfo.type,
                create_date: serverFolderInfo.create_date,
                star: serverFolderInfo.star
            });
        }
        catch(err) {
            return;
        }
    });

    // 결과 반환
    return result;
});

// getSetting - 설정 불러오기
ipcMain.handle("getSetting", async (_evnet) => {
    // 설정 파일 경로
    const settingPath = path.join(userDataFolderPath, "setting.ini");

    // 설정 파일 불러오기
    const settingFile = fs.readFileSync(settingPath, "utf-8");

    // 설정 파일 읽기
    const settingData = ini.parse(settingFile);

    // 설정 반환
    return settingData;
});

// getSystemTheme - 현재 시스템 테마 불러오기
ipcMain.handle("getSystemTheme", async (_evnet) => {
    // 현재 시스템 테마
    const systemTheme = nativeTheme.shouldUseDarkColors ? "dark" : "light";

    // 현재 시스템 테마 반환
    return systemTheme;
});

// setSetting - 저장 파일 수정
ipcMain.handle("setSetting", async (_event, object) => {
    // 설정 파일 경로
    const settingPath = path.join(userDataFolderPath, "setting.ini");

    // 설정 파일 불러오기
    const settingFile = fs.readFileSync(settingPath, "utf-8");

    // 설정 파일 읽기
    const settingData = ini.parse(settingFile);

    // 설정 수정 오브젝트 키 선언
    const key = Object.keys(object);

    // 설정 파일 수정
    key.map((element) => {
        settingData["Program"][element] = object[element]
    });
    
    // 설정 파일 저장
    fs.writeFileSync(settingPath, ini.stringify(settingData));
});

// openGithub - Github 열기
ipcMain.handle("openGithub", async (_event) => {
    shell.openExternal("https://github.com/SadAriel");

    return;
});