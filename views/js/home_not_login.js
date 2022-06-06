// 로그인 체크 필요(최초 한번 체크)
async function checkLogin() {
  const result = await getUserInfo();
  // 이미 로그인 했을 때 다른페이지로 이동
  if (result.state !== LOGIN_REQUIRED) {
    location.href = "/authorized";
  }
}

// 데이터 가져오기
async function home() {
  // 최근 게시판 정보
  const boardResult = await getRecentBoard();
  // 최근 게시판 정보 파싱
  for (let num in boardResult) {
    document.getElementsByClassName("home__board--title")[num].innerHTML = `${boardResult[num].postTitle}`;
    document.getElementsByClassName("home__board--nickname")[num].innerHTML = `작성자: ${boardResult[num].nickname}`;

    document.getElementsByClassName("home__board--link")[num].href = `/board/${boardResult[num].boardIndex}`;
  }
  // 명언 정보
  const wiseSayingResult = await getWiseSaying();
  // 명언 정보 파싱
  document.getElementsByClassName("home__wiseSaying--content")[0].innerHTML = wiseSayingResult.wiseSayingContent;
  document.getElementsByClassName("home__wiseSaying--celebrity")[0].innerHTML = wiseSayingResult.celebrity;
}
async function lifeCycle(){
  await checkLogin();
  await home();
}
lifeCycle();
