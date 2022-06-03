let userPage = 2;
// 해당 유저가 작성한 게시글 목록
async function userPost() {
  const boardResult = await userPostRequest();
  // 로그인 필요
  if (boardResult.state === LOGIN_REQUIRED) {
    const result = await sweetAlert(WARNING, "로그인 필요", "로그인이 필요한 기능입니다.");
    if (result) {
      const link = "/user/login";
      location.href = link;
    }
    // 유저가 작성한 게시글이 없을 때
  } else if (boardResult.state === NO_REGISTERED_INFORMATION) {
    // 게시물 리스트 생성
    const listElement = document.createElement("li");
    listElement.classList.add("userResource--board__list");
    document.getElementsByClassName("userResource__board--container")[0].appendChild(listElement);
    const titleElement = document.createElement("p");
    titleElement.classList.add("userResource__board--title");
    titleElement.textContent = "작성한 글이 없습니다.";
    document.getElementsByClassName("userResource--board__list")[0].appendChild(titleElement);
    // 게시글 정보 불러옴
  } else if (boardResult[0] !== undefined) {
    // 유저가 작성한 게시물 목록 불러오기
    for (let postData of boardResult) {
      const { boardIndex, postTitle, viewCount, favoriteCount, createDate } = postData;
      await addPost(postTitle, viewCount, favoriteCount, createDate, boardIndex);
    }

    // 예외 상황
  } else {
    const result = await sweetAlert(
      ERROR,
      "작성한 글 불러오기 실패",
      "예상치 못한 오류입니다."`서버 메세지: ${boardResult.state}`
    );
    if (result) location.href = "/";
  }
}

// 게시글 list 에 추가
async function addPost(postTitle, viewCount, favoriteCount, createDate, boardIndex) {
  // 게시물 리스트 생성
  const listElement = document.createElement("li");
  listElement.classList.add("userResource__board--list");
  document.getElementsByClassName("userResource__board--container")[0].appendChild(listElement);
  // 게시글 순서
  const index = document.getElementsByClassName("userResource__board--list").length - 1;
  // 게시물 리스트에 추가할 요소들
  // 하이퍼링크
  const hrefElement = document.createElement("a");
  hrefElement.classList.add("userResource__board--href");
  hrefElement.setAttribute("href", `/board/${boardIndex}`);
  document.getElementsByClassName("userResource__board--list")[index].appendChild(hrefElement);
  // 게시글 제목
  const titleElement = document.createElement("p");
  titleElement.classList.add("userResource__board--title");
  titleElement.textContent = `${postTitle}`;
  // 게시글 조회수
  const viewElement = document.createElement("p");
  viewElement.classList.add("userResource__board--viewCount");
  viewElement.innerHTML = `
              <img className="userResouce__board--img" width="17px",height="17px" src="/views/img/view.png" alt="조회수 아이콘" /> ${viewCount}`;
  // 게시글 좋아요 수
  const favoriteElement = document.createElement("p");
  favoriteElement.classList.add("userResource__board--favoriteCount");
  favoriteElement.innerHTML = `
              <img className="userResource__board--img" width="17px",height="17px" src="/views/img/love.png" alt="조회수 아이콘" /> ${favoriteCount}`;
  // 작성 날짜
  const createDateElement = document.createElement("p");
  createDateElement.classList.add("userResource__board--createDate");
  createDateElement.textContent = `${createDate}`;
  // 삭제하기 버튼
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("button__userResource--delete");
  deleteButton.innerHTML = "삭제";
  document.getElementsByClassName("userResource__board--href")[index].append(titleElement);
  document.getElementsByClassName("userResource__board--href")[index].append(viewElement);
  document.getElementsByClassName("userResource__board--href")[index].append(favoriteElement);
  document.getElementsByClassName("userResource__board--href")[index].append(createDateElement);
  document.getElementsByClassName("userResource__board--href")[index].append(deleteButton);
}
// 해당 페이지 불렀을 때 최초 한번 실행
async function lifeCycle() {
  await userPost();
  // 무한 스크롤링
  window.onscroll = async function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
      const boardResult = await userPostRequest(userPage++);
      // 로그인 필요
      if (boardResult.state === LOGIN_REQUIRED) {
        const result = await sweetAlert(WARNING, "로그인 필요", "로그인이 필요한 기능입니다.");
        if (result) {
          const link = "/user/login";
          location.href = link;
        }
      } // 해당 게시글 정보를 성공적으로 가져왔을 때 동적으로 게시글 정보 추가
      else if (boardResult[0] !== undefined) {
        for (let postData of boardResult) {
          const { boardIndex, postTitle, viewCount, favoriteCount, createDate } = postData;
          await addPost(postTitle, viewCount, favoriteCount, createDate, boardIndex);
        }
        // 예상치 못한 오류
      } else if (boardResult.state !== NO_REGISTERED_INFORMATION) {
        const result = await sweetAlert(
          ERROR,
          "작성한 글 불러오기 실패",
          "예상치 못한 오류입니다."`서버 메세지: ${boardResult.state}`
        );
        if (result) location.href = "/";
      }
    }
  };
}
lifeCycle();
