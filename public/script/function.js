// public/script/function.js


// changeContainer - 컨테이너 변경
const changeContainer = ($element) => {
    // 클릭한 요소의 데이터 불러오기
    const changeData = $($element).attr("data-container").split("-");

    // 현재 컨테이너
    const beforeContainer = changeData[0];

    // 이동할 컨테이너
    const afterContainer = changeData[1];

    // 현재 컨테이너 숨기기
    $(`.${beforeContainer}-container`).css("display", "none");

    // 이동할 컨테이너 보이기
    $(`.${afterContainer}-container`).css("display", "block");
};

// getNestedValue - JSON 탐색
const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj) || path;
}