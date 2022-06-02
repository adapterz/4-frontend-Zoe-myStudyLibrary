
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
    const result = await sweetAlert(
      ERROR,
      "로그아웃 실패",
      "다시 시도해주세요",
      `서버 메시지: ${backendResult.state}`
    );
  }
}

// 데이터 가져오기(최초 1회)
async function page() {
  // 최근 게시판 정보
  const boardResult = await getRecentBoard();
  // 최근 게시판 정보 파싱
  for (let num in boardResult) {
    document.getElementsByClassName("home__board--title")[num].innerHTML = `${boardResult[num].postTitle}`;
    document.getElementsByClassName("home__board--nickname")[
      num
      ].innerHTML = `작성자: ${boardResult[num].nickname}`;
    document.getElementsByClassName("home__board--link")[num].href=`/board/${boardResult[num].boardIndex}`;
  }
  // 명언 정보
  const wiseSayingResult = await getWiseSaying();
  // 명언 정보 파싱
  document.getElementsByClassName("home__wiseSaying--content")[0].innerHTML = wiseSayingResult.wiseSayingContent;
  document.getElementsByClassName("home__wiseSaying--celebrity")[0].innerHTML = wiseSayingResult.celebrity;

  // 유저 정보
  const userResult = await getUserInfo();
  document.getElementsByClassName("home__user--nickname")[0].innerHTML = `${userResult.nickname}님`;
  // 등록된 프로필 사진이 있을 때 프로필 사진 정보 주기
  if (userResult.isProfileImage) {
    const image = userResult.profileImage;
    const mime = userResult.mime;
    const imageHTML = document.getElementsByClassName("home__user--profileImage")[0];
    imageHTML.innerHTML = `<img class="home__user--profileImageImg" src="data:${mime};base64,${image}" alt="유저 프로필 사진">`;
  }
}

async function lifeCycle() {
  await checkLogin();
  await page();
}
lifeCycle();