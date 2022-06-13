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
  // 게시물 리스트 생성 & 최근 게시판 정보 파싱
  if(boardResult.state===undefined) {
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
  if(wiseSayingResult.state===undefined) {
    // 명언 정보 파싱
    document.getElementsByClassName("home__wiseSaying--content")[0].innerHTML = wiseSayingResult.wiseSayingContent;
    document.getElementsByClassName("home__wiseSaying--celebrity")[0].innerHTML = wiseSayingResult.celebrity;
  }
}
async function lifeCycle() {
  await checkLogin();
  await home();
}
lifeCycle();
