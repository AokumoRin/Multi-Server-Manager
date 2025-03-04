// public/script/index.js

$(document).ready(async () => {
    // 설정 관리
    await settingManager();
});

// settingManager - 설정 관리
const settingManager = async () => {
    // 저장된 설정 가져오기
    const settingData = await window.multiServerManager.getSetting();

    // 언어 셀렉트 적용
    let languageSetting = settingData["Program"]["Language"];
    $(".setting-language-select").val(languageSetting);

    // 테마 셀럭트 적용
    let themeSetting = settingData["Program"]["Theme"];
    $(".setting-theme-select").val(themeSetting);

    // 언어 목록 불러오기
    // 추후 추가 예정

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