// public/script/index.js

$(document).ready(async () => {
    // 설정 관리
    await settingManager();

    // 언어 셀렉트가 변경될때
    $(".setting-language-select").on("change", async function () {
        // 변경된 셀렉트 값 선언
        const changeLanguage = $(this).val();

        // 저장 파일 수정 요청
        await window.multiServerManager.setSetting({
            Language: changeLanguage
        });

        // 언어 설정 불러오기
        await setLanguage();
    });

    // 테마 셀렉트가 변경될때
    $(".setting-theme-select").on("change", async function () {
        // 변경된 셀렉트 값 선언
        const changeTheme = $(this).val();

        // 저장 파일 수정 요청
        await window.multiServerManager.setSetting({
            Theme: changeTheme
        });

        // 테마 설정 불러오기
        await setTheme();
    })

    // 테마 변경 요청을 받을때
    window.multiServerManager.updateTheme(async () => {
        // 테마 설정 불러오기
        await setTheme();
    });
});

// settingManager - 설정 관리
const settingManager = async () => {
    // 언어 셀렉트 설정
    await setLanguageSelect();

    // 언어 설정
    await setLanguage();
    
    // 테마 설정
    await setTheme();
}

// setLanguageSelect - 언어 셀렉트 설정
const setLanguageSelect = async () => {
    // 언어 목록 가져오기
    const languageList = await window.multiServerManager.getLanguageList();

    // 언어 파일 셀렉트 추가 하기
    languageList.map((element) => {
        console.log(element)
        $(".setting-language-select").append(`
            <option value="${element.filename}">${element.name}</option>
        `);
    });

    // 저장된 설정 가져오기
    const settingData = await window.multiServerManager.getSetting();

    // 언어 셀렉트 적용
    let languageSetting = settingData["Program"]["Language"];
    $(".setting-language-select").val(languageSetting);
};

// setLanguage - 언어 설정
const setLanguage = async () => {
    // 저장된 설정 가져오기
    const settingData = await window.multiServerManager.getSetting();

    // 저장된 언어 가져오기
    let language = settingData["Program"]["Language"];

    // 언어 설정이 자동 일 경우
    if (language === "auto") {
        // 현재 시스템 언어 불러오기
        const systemLanguage = await window.multiServerManager.getSystemLanguage();

        // 언어에 현재 시스템 언어 적용하기
        language = systemLanguage;
    }

    // 선택된 언어 파일 불러오기
    const languageData = await window.multiServerManager.getLanguageData(language);

    // 언어 파일 적용하기
    $(".language").map((i, element) => {
        $(element).html(getNestedValue(languageData, $(element).attr("data-language")));
    });
};

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

// getNestedValue - JSON 탐색
const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj) || path;
}

