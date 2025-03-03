// ipcHandlers.js

// 모듈 선언
const { app, ipcMain, dialog, shell } = require("electron");
const path = require("path");
const fs = require("fs");

// 상수 선언
const programFolderPath = path.join(app.getPath("exe"), "..");

// getServerList - 서버 목록 불러오기
ipcMain.handle("getServerList", async (_event) => {
    // 상수 선언
    const result = [];

    // 서버 폴더 경로
    const serverFolderPath = path.join(programFolderPath, "server");

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

// openGithub - Github 열기
ipcMain.handle("openGithub", async (_event) => {
    shell.openExternal("https://github.com/SadAriel");

    return;
});