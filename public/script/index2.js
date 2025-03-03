// public/script/index.js

$(document).ready(async () => {
    // 서버 목록 관리
    await serverListManager();

    // 서버 목록 토글 버튼 클릭 시
    $(".serverListToggleButton").click(() => {
        // 상수 선언
        const serverListBox = $(".serverListBox");

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

    // 서버 박스 탐색
    $(".serverBox").map((i, element) => {
        // 서버 박스
        const serverBox = $(element)

        // 첫번째 서버 박스가 아닌경우
        if(i !== 0) {
            // 서버 박스 위치 조정
            serverBox.css("top", `calc(52.7969px + (${i} * 5.5em))`);
        }
    });
});

// serverListManager - 서버 목록 관리
const serverListManager = async () => {
    // 서버 목록 받아오기
    const serverList = await window.multiServerManager.getServerList();

    // 서버 목록 정렬
    serverList.sort((a, b) => {
        if(a.star === b.star) {
            const dateA = new Date(a.create_date);
            const dateB = new Date(b.create_date);
            return dateA - dateB;
        }
        return a.star ? -1 : 1;
    });

    console.log(serverList)

    // 서버 목록 추가
    serverList.map((element) => {
        $(".serverList").append(`
            <!-- 서버 -->
            <div class="serverBox">
                <!-- 서버 선택 버튼 -->
                <button class="btn btn-outline-secondary d-flex w-100 serverButton">
                    <div class="d-flex align-items-center w-100">
                        <!-- 서버 이미지 -->
                        <img class="serverImage" src="${element.icon}" />

                        <!-- 서버 정보 박스 -->
                        <div class="w-100 ps-2 serverInfoBox">
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
                <button class="btn serverStar">
                    <i class="fa-solid fa-star fa-2xs" ${element.star ? `style = "color: #FFD700"` : ``}></i>
                </button>
            </div>
        `);
    });
};