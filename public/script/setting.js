// public/script/index.js

$(document).ready(async () => {
    // 설정 관리
    await settingManager();

    // 테마 변경 요청을 받을때
    window.multiServerManager.updateTheme(async () => {
        // 테마 설정 불러오기
        await setTheme();
    });
});

// settingManager - 설정 관리
const settingManager = async () => {
    // 테마 설정
    await setTheme();

    // 언어 설정
    await setLanguage();
}

// setTheme - 테마 설정
const setTheme = async () => {
    // 저장된 설정 가져오기
    const settingData = await window.multiServerManager.getSetting();

    // 테마 셀럭트 적용
    let themeSetting = settingData["Program"]["Theme"];
    $(".setting-theme-select").val(themeSetting);

    // 테마 설정이 자동 일 경우
    if(themeSetting === "auto") {
        // 현재 시스템 테마 불러오기
        const systemTheme = await window.multiServerManager.getSystemTheme();

        // 테마에 현재 시스템 테마 적용하기
        themeSetting = systemTheme;
    }

    // 테마 적용
    $("html").attr("data-bs-theme", themeSetting);
}

// setLanguage - 언어 설정
const setLanguage = async () => {
    // 저장된 설정 가져오기
    const settingData = await window.multiServerManager.getSetting();

    // 언어 셀렉트 적용
    let languageSetting = settingData["Program"]["Language"];
    $(".setting-language-select").val(languageSetting);
};