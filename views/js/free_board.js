let isEntire = true;
let entirePage = 2;
let scrollSearchPage = 2;
let scrollSearchOption;
let scrollSearchContent;
// 최초 한번 전체 게시글 정보 가져오기
async function entireBoard(page) {
  // 전체 게시판 정보
  const boardResult = await getEntireBoard(page);
  // 결과가 없을 때
  if ((page !== undefined || page === 1) && boardResult.state === NOT_EXIST) {
    // 게시물 리스트 생성
    const listElement = document.createElement("li");
    listElement.classList.add("freeBoard__board--list");
    document.getElementsByClassName("freeBoard__board")[0].appendChild(listElement);
    const titleElement = document.createElement("p");
    titleElement.classList.add("freeBoard__board--title");
    titleElement.textContent = "검색결과가 없습니다";
    document.getElementsByClassName("freeBoard__board--list")[0].appendChild(titleElement);
  } else if (boardResult[0] !==undefined) {
    // 전체 게시물 목록 불러오기
    for (let index in boardResult) {
      await addPost(
        boardResult[index].postTitle,
        boardResult[index].nickname,
        boardResult[index].viewCount,
        boardResult[index].favoriteCount,
        boardResult[index].createDate,
        boardResult[index].boardIndex
      );
    }
  } else {
    const result = await sweetAlert(
      ERROR,
      "게시판 불러오기 실패",
      "예상치 못한 오류입니다."`서버 메세지: ${boardResult.state}`
    );
    if (result) {
      const link = "/board";
      location.href = link;
    }
  }
}

// 최초 검색 요청 시 호출해줄 메서드
async function searchBoard(searchOption, searchContent, page) {
  // 검색 결과
  const boardResult = await getSearchBoard(searchOption, searchContent, page);
  // 페이지 게시글목록 초기화
  const nav = document.getElementsByClassName("freeBoard__board")[0];
  nav.innerHTML = "";
  // 검색 결과가 없을 때
  if ((page !== undefined || page === 1) && boardResult.state === NOT_EXIST) {
    // 게시물 리스트 생성
    const listElement = document.createElement("li");
    listElement.classList.add("freeBoard__board--list");
    document.getElementsByClassName("freeBoard__board")[0].appendChild(listElement);
    const titleElement = document.createElement("p");
    titleElement.classList.add("freeBoard__board--title");
    titleElement.textContent = "검색결과가 없습니다";
    document.getElementsByClassName("freeBoard__board--list")[0].appendChild(titleElement);
  } else if (boardResult[0]!==undefined) {
    isEntire = false;
    scrollSearchPage = 2;
    scrollSearchOption = searchOption;
    scrollSearchContent = searchContent;
    // 검색결과 추가
    for (let index in boardResult) {
      await addPost(
        boardResult[index].postTitle,
        boardResult[index].nickname,
        boardResult[index].viewCount,
        boardResult[index].favoriteCount,
        boardResult[index].createDate,
        boardResult[index].boardIndex
      );
    }
  } else {
    const result = await sweetAlert(
      ERROR,
      "게시판 불러오기 실패",
      "예상치 못한 오류입니다."`서버 메세지: ${boardResult.state}`
    );
    if (result) {
      const link = "/board";
      location.href = link;
    }
  }
}
// 게시글 list 에 추가
async function addPost(postTitle, nickname, viewCount, favoriteCount, createDate, boardIndex) {
  // 게시물 리스트 생성
  const listElement = document.createElement("li");
  listElement.classList.add("freeBoard__board--list");
  document.getElementsByClassName("freeBoard__board")[0].appendChild(listElement);
  // 게시글 순서
  const index = document.getElementsByClassName("freeBoard__board--list").length - 1;
  // 게시물 리스트에 추가할 요소들
  // 하이퍼링크
  const hrefElement = document.createElement("a");
  hrefElement.classList.add("freeBoard__board--href");
  hrefElement.setAttribute("href", `/board/${boardIndex}`);
  document.getElementsByClassName("freeBoard__board--list")[index].appendChild(hrefElement);
  // 게시글 제목
  const titleElement = document.createElement("p");
  titleElement.classList.add("freeBoard__board--title");
  titleElement.textContent = `${postTitle}`;
  // 게시글 작성자
  const nicknameElement = document.createElement("p");
  nicknameElement.classList.add("freeBoard__board--nickname");
  nicknameElement.textContent = `${nickname}`;
  // 게시글 조회수
  const viewElement = document.createElement("p");
  viewElement.classList.add("freeBoard__board--viewCount");
  viewElement.innerHTML = `
              <img className="freeBoard__board--img" width="15px",height="15px" src="/views/img/view.png" alt="조회수 아이콘" /> ${viewCount}`;
  // 게시글 좋아요 수
  const favoriteElement = document.createElement("p");
  favoriteElement.classList.add("freeBoard__board--favoriteCount");
  favoriteElement.innerHTML = `
              <img className="freeBoard__board--img" width="15px",height="15px" src="/views/img/love.png" alt="조회수 아이콘" /> ${favoriteCount}`;
  // 작성 날짜
  const createDateElement = document.createElement("p");
  createDateElement.classList.add("freeBoard__board--createDate");
  createDateElement.textContent = `${createDate}`;
  document.getElementsByClassName("freeBoard__board--href")[index].append(titleElement);
  document.getElementsByClassName("freeBoard__board--href")[index].append(nicknameElement);
  document.getElementsByClassName("freeBoard__board--href")[index].append(viewElement);
  document.getElementsByClassName("freeBoard__board--href")[index].append(favoriteElement);
  document.getElementsByClassName("freeBoard__board--href")[index].append(createDateElement);
}
// 글쓰기 버튼 눌렀을 때 로그인 체크
// 로그인 여부 체크
async function checkLogin() {
  const backendResult = await getUserInfo();
  // 로그인 안 했을 때 로그인 페이지로 이동
  if (backendResult.state === LOGIN_REQUIRED) {
    const result = await sweetAlert(WARNING, "로그인 필요", "로그인이 필요한 기능입니다.");
    if (result) {
      const link = "/user/login";
      location.href = link;
    }
  } else {
    const link = "/board/write";
    location.href = link;
  }
}

async function lifeCycle() {
  await entireBoard();

// 무한 스크롤링
  window.onscroll = async function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      let boardResult;
      if (isEntire === true) {
        boardResult = await getEntireBoard(entirePage++);
        if (boardResult[0] !==undefined) {
          // 전체 게시물 목록 불러오기
          for (let index in boardResult) {
            await addPost(
              boardResult[index].postTitle,
              boardResult[index].nickname,
              boardResult[index].viewCount,
              boardResult[index].favoriteCount,
              boardResult[index].createDate,
              boardResult[index].boardIndex
            );
          }
        } else if (boardResult.state !== NOT_EXIST) {
          const result = await sweetAlert(
            ERROR,
            "게시판 불러오기 실패",
            "예상치 못한 오류입니다."`서버 메세지: ${boardResult.state}`
          );
        }
      } else {
        boardResult = await getSearchBoard(scrollSearchOption, scrollSearchContent, scrollSearchPage++);

        if (boardResult[0] !==undefined) {
          // 전체 게시물 목록 불러오기
          for (let index in boardResult) {
            await addPost(
              boardResult[index].postTitle,
              boardResult[index].nickname,
              boardResult[index].viewCount,
              boardResult[index].favoriteCount,
              boardResult[index].createDate,
              boardResult[index].boardIndex
            );
          }
        } else if (boardResult.state !== NOT_EXIST) {
          const result = await sweetAlert(
            ERROR,
            "게시판 불러오기 실패",
            "예상치 못한 오류입니다."`서버 메세지: ${boardResult.state}`
          );
        }
      }
    }
  };
}
lifeCycle();
