// public/script/index.js

$(document).ready(async () => {
    // 서버 목록 관리
    await serverListManager();

    // 서버 목록 토글 버튼 클릭 시
    $(".server-list-toggle-button").click(() => {
        // 상수 선언
        const serverListBox = $(".server-list-box");

        // 서버 목록 박스 상태 확인
        const serverListBoxState = serverListBox.attr("data-open") === "true" ? true : false;

        // 서버 목록 박스가 열려 있으면
        if(serverListBoxState) {
            // 서버 목록 박스 숨기기
            serverListBox.css("left", "-30vw");

            // 서버 목록 박스 상태 변경
            serverListBox.attr("data-open", "false");
        }

        // 서버 목록 박스가 닫혀 있으면
        else {
            // 서버 목록 박스 보이기
            serverListBox.css("left", "0vw");

            // 서버 목록 박스 상태 변경
            serverListBox.attr("data-open", "true");
        }
    });

    // 이동 버튼 클릭 시
    $(".change-container").click(function() {
        // 컨테이너 변경
        changeContainer(this);
    });

    // 서버 버튼 클릭 시
    $(document).on("click", ".server-button", function() {
        // 모든 서버 버튼 활성화 제거
        $(".server-button").removeClass("active");

        // 해당 서버 버튼 활성화
        $(this).addClass("active");

        // 서버 목록 박스 숨기기
        $(".server-list-box").css("left", "-30vw");

        // 서버 목록 박스 상태 변경
        $(".server-list-box").attr("data-open", "false");
    });

    // 서버 목록 새로고침 버튼 클릭 시
    $(".server-list-refresh-button").click(async () => {
        // 서버 목록 관리
        await serverListManager();
    });
});

// serverListManager - 서버 목록 관리
const serverListManager = async () => {
    // 현재 서버 목록 초기화
    $(".server-list").empty();

    // 서버 목록 받아오기
    const serverList = await window.multiServerManager.getServerList();

    // 서버 목록이 없는 경우
    if(serverList.length === 0) {
        $(".server-list").append(`
            <!-- 서버 -->
            <div class="server-none">
                <button class="btn btn-outline-secondary d-flex w-100 server-none-button language" data-language="main.serverlist.undefined" disabled>
                    main.serverlist.undefined
                </button>
            </div>
        `);

        // 서버 파일 개수 수정
        $(".server-list-count-text").html("0 ");

        return;
    }

    // 서버 목록 정렬
    serverList.sort((a, b) => {
        if(a.star === b.star) {
            const dateA = new Date(a.create_date);
            const dateB = new Date(b.create_date);
            return dateA - dateB;
        }
        return a.star ? -1 : 1;
    });

    // 서버 목록 추가
    serverList.map((element) => {
        $(".server-list").append(`
            <!-- 서버 -->
            <div class="server-box">
                <!-- 서버 선택 버튼 -->
                <button class="btn btn-outline-secondary d-flex w-100 server-button">
                    <div class="d-flex align-items-center w-100">
                        <!-- 서버 이미지 -->
                        <img class="server-image" src="${element.icon}" />

                        <!-- 서버 정보 박스 -->
                        <div class="w-100 ps-2 server-info-box">
                            <!-- 서버 이름 -->
                            <p class="font-bold">${element.name}</p>

                            <!-- 서버 버전 -->
                            <p class="font-light font-12">Ver ${element.version}</p>

                            <!-- 서버 정보 정렬 박스 -->
                            <div class="d-flex justify-content-between">
                                <!-- 서버 종류 -->
                                <p class="font-light font-12">${element.type.join(" / ")}</p>

                                <!-- 서버 생성 날짜 -->
                                <p class="font-light font-12">${element.create_date}</p>
                            </div>
                        </div>
                    </div>
                </button>
                <!-- 서버 즐겨찾기 버튼 -->
                <button class="btn server-star">
                    <i class="fa-solid fa-star fa-2xs" ${element.star ? `style = "color: #FFD700"` : ``}></i>
                </button>
            </div>
        `);
    });

    // 서버 파일 개수
    const serverListCount = serverList.length;

    // 서버 파일 개수 수정
    $(".server-list-count-text").html(serverListCount);

    // 서버 박스 탐색
    $(".server-box").map((i, element) => {
        // 서버 박스
        const serverBox = $(element)

        // 첫번째 서버 박스가 아닌경우
        if (i !== 0) {
            // 서버 박스 위치 조정
            serverBox.css("top", `${i * 5.2}em`);
        }
    });
};

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