// 로그인 체크 필요(최초 한번 체크)
async function checkLogin() {
  const result = await getUserInfo();
  // 로그인 안했을 때 로그인 창 있는 홈페이지로
  if (result.state === LOGIN_REQUIRED) {
    location.href = "/";
  }
}
// 버튼 메서드 정의
// 로그아웃
async function logout() {
  const backendResult = await logoutRequest();
  if (backendResult.state === LOGOUT) {
    const result = await sweetAlert(SUCCESS, "로그아웃 성공", "홈페이지로 이동합니다");
    if (result) {
      const link = "/";
      location.href = link;
    }
  } else {
    const result = await sweetAlert(ERROR, "로그아웃 실패", "다시 시도해주세요", `서버 메시지: ${backendResult.state}`);
  }
}

// 데이터 가져오기(최초 1회)
async function home() {
  // 최근 게시판 정보
  const boardResult = await getRecentBoard();
  // 게시물 리스트 생성 & 최근 게시판 정보 파싱
  if (boardResult.state === undefined) {
    for (let num in boardResult) {
      // 게시물 리스트 생성
      const listElement = document.createElement("li");
      listElement.classList.add("home__board--list");
      document.getElementsByClassName("home__board--container")[0].appendChild(listElement);
      // 하이퍼링크
      const hrefElement = document.createElement("a");
      hrefElement.classList.add("home__board--link");
      hrefElement.setAttribute("href", `/board/${boardResult[num].boardIndex}`);
      document.getElementsByClassName("home__board--list")[num].appendChild(hrefElement);
      // 게시글 제목
      const titleElement = document.createElement("p");
      titleElement.classList.add("home__board--title");
      titleElement.textContent = `${boardResult[num].postTitle}`;
      // 게시글 작성자
      const nicknameElement = document.createElement("p");
      nicknameElement.classList.add("home__board--nickname");
      nicknameElement.textContent = `작성자: ${boardResult[num].nickname}`;

      document.getElementsByClassName("home__board--link")[num].append(titleElement);
      document.getElementsByClassName("home__board--link")[num].append(nicknameElement);
    }
  }
  // 명언 정보
  const wiseSayingResult = await getWiseSaying();

  if (boardResult.state === undefined) {
    // 명언 정보 파싱
    document.getElementsByClassName("home__wiseSaying--content")[0].innerHTML = wiseSayingResult.wiseSayingContent;
    document.getElementsByClassName("home__wiseSaying--celebrity")[0].innerHTML = wiseSayingResult.celebrity;
  }
  // 유저 정보
  const userResult = await getUserInfo();
  document.getElementsByClassName("home__user--nickname")[0].innerHTML = `${userResult.nickname}님`;
  // 등록된 프로필 사진이 있을 때 프로필 사진 정보 주기
  if (userResult.isProfileImage) {
    const image = userResult.profileImage;
    const mime = userResult.mime;
    const tempImg = document.createElement("img");
    tempImg.setAttribute("src", `data:${mime};base64,${image}`);
    // 이미지의 높이가 넓이보다 길 때
    if (tempImg.height > tempImg.width) {
      const imageHTML = document.getElementsByClassName("home__user--profileImage")[0];
      imageHTML.innerHTML = `<img  class="home__user--profileImageFitWidth" src="data:${mime};base64,${image}" alt="유저 프로필 사진">`;
    }
    // 이미지의 넓이가 높이보다 길 때
    if (tempImg.height <= tempImg.width) {
      const imageHTML = document.getElementsByClassName("home__user--profileImage")[0];
      imageHTML.innerHTML = `<img class="home__user--profileImageFitHeight" src="data:${mime};base64,${image}" alt="유저 프로필 사진">`;
    }
  }
}

async function lifeCycle() {
  await checkLogin();
  await home();
}
lifeCycle();
