let userPage = 2;
// 유저가 작성한 댓글 정보(최초 1번 호출해줄 메서드)
async function userComment() {
  const commentResult = await userCommentRequest();
  // 로그인 필요
  if (commentResult.state === LOGIN_REQUIRED) {
    const result = await sweetAlert(WARNING, "로그인 필요", "로그인이 필요한 기능입니다.");
    if (result) {
      const link = "/user/login";
      location.href = link;
    }
    // 유저가 작성한 댓글이 없을 때
  } else if (commentResult.state === NO_REGISTERED_INFORMATION) {
    // 댓글 리스트 생성
    const listElement = document.createElement("li");
    listElement.classList.add("userResource--comment__list");
    document.getElementsByClassName("userResource__comment--container")[0].appendChild(listElement);
    const titleElement = document.createElement("p");
    titleElement.classList.add("userResource__comment--title");
    titleElement.textContent = "작성한 댓글이 없습니다.";
    document.getElementsByClassName("userResource--comment__list")[0].appendChild(titleElement);
    // 게시글 정보 불러옴
  } else if (commentResult[0] !== undefined) {
    // 유저가 작성한 댓글 목록 불러오기
    for (let commentData of commentResult) {
      const { commentIndex, boardIndex, postTitle, commentContent, createDate } = commentData;
      await addComment(postTitle, commentContent, createDate, boardIndex, commentIndex);
    }
    // 예외 상황
  } else {
    const result = await sweetAlert(
      ERROR,
      "작성한 댓글 불러오기 실패",
      "예상치 못한 오류입니다."`서버 메세지: ${commentResult.state}`
    );
    if (result) location.href = "/";
  }
}
// 댓글 추가
async function addComment(postTitle, commentContent, createDate, boardIndex, commentIndex) {
  // 댓글 리스트 생성
  const listElement = document.createElement("li");
  listElement.classList.add("userResource__comment--list");
  document.getElementsByClassName("userResource__comment--container")[0].appendChild(listElement);
  // 댓글 순서
  const index = document.getElementsByClassName("userResource__comment--list").length - 1;
  // 댓글 리스트에 추가할 요소들
  // 하이퍼링크
  const hrefElement = document.createElement("a");
  hrefElement.classList.add("userResource__comment--href");
  hrefElement.setAttribute("href", `/board/${boardIndex}`);
  document.getElementsByClassName("userResource__comment--list")[index].appendChild(hrefElement);
  // 게시글 제목
  const titleElement = document.createElement("p");
  titleElement.classList.add("userResource__comment--title");
  titleElement.textContent = `${postTitle}`;
  // 댓글 내용
  const contentElement = document.createElement("p");
  contentElement.classList.add("userResource__comment--content");
  contentElement.textContent = `${commentContent}`;
  // 작성 날짜
  const createDateElement = document.createElement("p");
  createDateElement.classList.add("userResource__comment--createDate");
  createDateElement.textContent = `${createDate}`;
  // 삭제하기 버튼
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("button__userResource--delete");
  deleteButton.setAttribute("boardIndex", boardIndex);
  deleteButton.setAttribute("commentIndex", commentIndex);
  deleteButton.setAttribute(
    "onclick",
    "deleteComment(this.getAttribute('boardIndex'),this.getAttribute('commentIndex'))"
  );
  deleteButton.innerHTML = "삭제";
  document.getElementsByClassName("userResource__comment--href")[index].append(titleElement);
  document.getElementsByClassName("userResource__comment--href")[index].append(contentElement);
  document.getElementsByClassName("userResource__comment--href")[index].append(createDateElement);
  document.getElementsByClassName("userResource__comment--list")[index].append(deleteButton);
}
// 댓글 삭제버튼 눌렀을 때
async function deleteComment(boardIndex,commentIndex){
  const backendResult = await deleteCommentRequest(boardIndex,commentIndex);
  // 로그인 필요할 때
  if (backendResult.state === LOGIN_REQUIRED) {
    const result = await sweetAlert(WARNING, "로그인 필요", "로그인창으로 갑니다.");
    if (result) location.href="/user/login"
  }
  // 게시글이 없을 때 게시글 목록으로 이동
  else if (backendResult.state === NOT_EXIST) {
    const result = await sweetAlert(WARNING, "존재하지 않는 게시글입니다.", "삭제되거나 존재하지 않는 게시글입니다.");
    if (result) location.href = "/comment/user";
  }
  // 댓글이 없을 때
  else if (backendResult.state === NO_COMMENT) {
    const result = await sweetAlert(WARNING, "존재하지 않는 댓글입니다.", "삭제되거나 존재하지 않는 댓글입니다.");
    if (result) location.href = "/comment/user";
  }
  // 요청 유저와 해당 게시글을 작성한 유저가 일치하지 않을 때
  else if (backendResult.state === NOT_AUTHORIZATION) {
    const result = await sweetAlert(WARNING, "권한이 없습니다.", "해당 댓글을 작성한 유저가 아닙니다.");
    if (result) location.href = "/";
  }
  // 삭제 성공
  else if (backendResult.state === REQUEST_SUCCESS) {
    const result = await sweetAlert(SUCCESS, "댓글 삭제 성공", "🤗");
    if (result) location.reload();
  }
  // 예상치 못한 오류
  else {
    const result = await sweetAlert(
      ERROR,
      "게시물 삭제 오류",
      "게시글 목록으로 돌아갑니다.",
      `서버 메세지: ${backendResult.state}`
    );
    if (result) location.href = "/board";
  }
}
// 페이지 불러올 때 최초 1번 호출해줄 메서드
async function lifeCycle() {
  await userComment();
  // 무한 스크롤링
  window.onscroll = async function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
      const commentResult = await userCommentRequest(userPage++);
      // 로그인 필요
      if (commentResult.state === LOGIN_REQUIRED) {
        const result = await sweetAlert(WARNING, "로그인 필요", "로그인이 필요한 기능입니다.");
        if (result) {
          const link = "/user/login";
          location.href = link;
        }
      } // 해당 게시글 정보를 성공적으로 가져왔을 때 동적으로 게시글 정보 추가
      else if (commentResult[0] !== undefined) {
        for (let commentData of commentResult) {
          const { commentIndex, boardIndex, postTitle, commentContent, createDate } = commentData;
          await addComment(postTitle, commentContent, createDate, boardIndex, commentIndex);
        }
        // 예상치 못한 오류
      } else if (commentResult.state !== NO_REGISTERED_INFORMATION) {
        const result = await sweetAlert(
          ERROR,
          "작성한 글 불러오기 실패",
          "예상치 못한 오류입니다."`서버 메세지: ${commentResult.state}`
        );
        if (result) location.href = "/";
      }
    }
  };
}
lifeCycle();
