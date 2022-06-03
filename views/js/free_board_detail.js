let commentPage = 2;
// url 에서 boardIndex 가져오기
async function getBoardIndex() {
  const url = location.href;
  const urlArray = url.split(`${FRONT_URL}/board/`);
  const boardIndex = urlArray[1];
  return boardIndex;
}
// 게시글 관련 로직
// 특정 게시글 정보 불러오기(최초 1번)
async function detailBoard() {
  const boardIndex = await getBoardIndex();
  const backendResult = await getDetailBoard(boardIndex);
  // 해당 게시글인덱스의 게시글이 없을 때
  if (backendResult.state === NOT_EXIST) {
    const result = await sweetAlert(WARNING, "존재하지 않는 게시글", "게시글 목록으로 이동");
    if (result) {
      location.href = "/board";
    }
    // 성공적으로 개시글 정보 불러왔을 때
  } else if (backendResult.state === REQUEST_SUCCESS) {
    // 게시글 정보 배치
    document.getElementsByClassName("freeBoard__board--title")[0].innerHTML = `${backendResult.dataOfBoard.postTitle}`;
    document.getElementsByClassName(
      "freeBoard__board--viewCount"
    )[0].innerHTML = `<img class="freeBoard__board--img" src="/views/img/view.png" alt="조회수 아이콘" /> ${backendResult.dataOfBoard.viewCount}`;
    document.getElementsByClassName(
      "freeBoard__board--favoriteCount"
    )[0].innerHTML = `<img class="freeBoard__board--img" src="/views/img/love.png" alt="좋아요 아이콘" /> ${backendResult.dataOfBoard.favoriteCount}`;
    document.getElementsByClassName(
      "freeBoard__board--content"
    )[0].innerHTML = `${backendResult.dataOfBoard.postContent}`;
    document.getElementsByClassName(
      "freeBoard__board--createDate"
    )[0].innerHTML = `${backendResult.dataOfBoard.createDate}`;
    // 태그 배치
    const length = backendResult.dataOfTag.length;
    for (let cnt = 0; cnt < 5; ++cnt) {
      if (cnt >= length) document.getElementsByClassName("freeBoard__board--tag")[cnt].style.display = "none";
      else {
        document.getElementsByClassName("freeBoard__board--tag")[
          cnt
        ].innerHTML = `# ${backendResult.dataOfTag[cnt].tag}`;
      }
    }
    // 유저 정보 배치
    document.getElementsByClassName("freeBoard__user--nickname")[0].innerHTML = `${backendResult.dataOfUser.nickname}`;
    // 유저에게 등록된 프로필 사진이 있을 때
    if (backendResult.dataOfUser.isProfileImage) {
      const image = backendResult.dataOfUser.profileImage;
      const mime = backendResult.dataOfUser.mime;
      const imageHTML = document.getElementsByClassName("freeBoard__user--profileImage")[0];
      imageHTML.innerHTML = `<img class="freeBoard__user--profileImageImg" src="data:${mime};base64,${image}" alt="글 작성한 유저 프로필 사진">`;
    }
    // 해당 게시글을 작성한 유저가 아닐 때 수정하기, 삭제하기 버튼 안보이게하기
    const userResult = await getUserInfo();
    if (userResult === LOGIN_REQUIRED || userResult.userIndex !== backendResult.dataOfUser.userIndex) {
      document.getElementsByClassName("container__freeBoard--authorization")[0].style.display = "none";
    }
  } // 예상치 못한 에러
  else {
    await sweetAlert(ERROR, "게시글 불러오기 실패", "예상치 못한 에러입니다", `서버 메시지: ${backendResult.state}`);
    location.href = "/board";
  }
}
// 좋아요 버튼 눌렀을 때
async function favoritePost() {
  const boardIndex = await getBoardIndex();
  const backendResult = await favoritePostRequest(boardIndex);
  // 로그인 필요할 때
  if (backendResult.state === LOGIN_REQUIRED) {
    const result = await sweetAlert(WARNING, "로그인 필요", "새 창에서 로그인 해주세요");
    if (result) window.open("/user/login");
  }
  // 게시글이 없을 때 게시글 목록으로 이동( 그 새 삭제되거나 했을 때)
  else if (backendResult.state === NOT_EXIST) {
    const result = await sweetAlert(WARNING, "존재하지 않는 게시글입니다.", "삭제되거나 존재하지 않는 게시글입니다.");
    if (result) location.href = "/board";
  }
  // 좋아요 +1
  else if (backendResult.state === FAVORITE) {
    const result = await sweetAlert(SUCCESS, "좋아요 +1", "해당 게시글의 좋아요 수가 올라갔어요. 😊");
    if (result) location.reload();
  }
  // 좋아요 취소
  else if (backendResult.state === CANCEL_FAVORITE) {
    const result = await sweetAlert(SUCCESS, "좋아요 취소", "해당 게시글의 좋아요 수가 내려갔어요. 😂");
    if (result) location.reload();
  }
  // 예상치 못한 에러
  else {
    await sweetAlert(ERROR, "좋아요 요청 실패", "예상치 못한 에러입니다", `서버 메시지: ${backendResult.state}`);
  }
}
// 삭제하기 버튼 눌렀을 때
async function deletePost() {
  const boardIndex = await getBoardIndex();
  const backendResult = await deletePostRequest(boardIndex);
  // 로그인 필요할 때
  if (backendResult.state === LOGIN_REQUIRED) {
    const result = await sweetAlert(WARNING, "로그인 필요", "홈페이지로 돌아갑니다");
    if (result) location.href = "/";
  }
  // 게시글이 없을 때 게시글 목록으로 이동
  else if (backendResult.state === NOT_EXIST) {
    const result = await sweetAlert(WARNING, "존재하지 않는 게시글입니다.", "삭제되거나 존재하지 않는 게시글입니다.");
    if (result) location.href = "/board";
  }
  // 요청 유저와 해당 게시글을 작성한 유저가 일치하지 않을 때
  else if (backendResult.state === NOT_AUTHORIZATION) {
    const result = await sweetAlert(WARNING, "권한이 없습니다.", "해당 게시글을 작성한 유저가 아닙니다.");
    if (result) location.href = "/board";
  }
  // 삭제 성공
  else if (backendResult.state === REQUEST_SUCCESS) {
    const result = await sweetAlert(SUCCESS, "게시글 삭제 성공", "게시글 목록으로 돌아갑니다.");
    if (result) location.href = "/board";
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
// 게시글 수정하기 버튼 눌렀을 때
async function editPage() {
  const boardIndex = await getBoardIndex();
  location.href = `/board/write?boardIndex=${boardIndex}`;
}
// 댓글 관련 로직
// 댓글 정보 불러오기(최초 한번)
async function detailComment() {
  const boardIndex = await getBoardIndex();
  const backendResult = await getDetailComment(boardIndex);
  // 게시글이 존재하지 않을 때
  if (backendResult.state === NOT_EXIST) {
    const result = await sweetAlert(WARNING, "존재하지 않는 게시글입니다.", "삭제되거나 존재하지 않는 게시글입니다.");
    if (result) location.href = "/board";
  }
  // 게시글이 존재하고 댓글 정보가 존재하지 않을 때
  else if (backendResult.state === NO_COMMENT) {
    // 게시물 리스트 생성
    const listElement = document.createElement("li");
    listElement.classList.add("freeBoard__rootComment");
    listElement.style.border = "none";
    document.getElementsByClassName("freeBoard__comment")[0].appendChild(listElement);
    const titleElement = document.createElement("p");
    titleElement.classList.add("freeBoard__rootComment--nickname");
    titleElement.textContent = "댓글이 없습니다";
    document.getElementsByClassName("freeBoard__rootComment")[0].appendChild(titleElement);
  }
  // 댓글 정보를 성공적으로 받아왔을 때
  else if (backendResult[0] !== undefined) {
    for (let commentData of backendResult) {
      const { commentIndex, userIndex, isRoot, isDeleted, nickname, commentContent, createDate } = commentData;
      await addComment(commentIndex, userIndex, isRoot, isDeleted, nickname, commentContent, createDate);
    }
  }
  // 예상치 못한 오류
  else {
    const result = await sweetAlert(
      ERROR,
      "댓글 불러오기 실패",
      "예상치 못한 에러입니다",
      `서버 메시지: ${backendResult.state}`
    );
    if (result) location.href = "/board";
  }
}
// 댓글 추가
async function addComment(commentIndex, userIndex, isRoot, isDeleted, nickname, commentContent, createDate) {
  // 댓글일 때
  if (isRoot) {
    // 댓글 리스트 생성
    const listElement = document.createElement("li");
    listElement.classList.add("freeBoard__rootComment");
    document.getElementsByClassName("freeBoard__comment")[0].appendChild(listElement);
    // 댓글 순서
    const index = document.getElementsByClassName("freeBoard__rootComment").length - 1;
    // 댓글 작성자
    const nicknameElement = document.createElement("p");
    nicknameElement.classList.add("freeBoard__rootComment--nickname");
    nicknameElement.textContent = nickname;
    document.getElementsByClassName("freeBoard__rootComment")[index].appendChild(nicknameElement);
    // 댓글 내용
    const contentElement = document.createElement("p");
    contentElement.classList.add("freeBoard__rootComment--content");
    if (isDeleted) contentElement.textContent = "삭제된 댓글입니다.";
    if (!isDeleted) contentElement.textContent = commentContent;

    document.getElementsByClassName("freeBoard__rootComment")[index].appendChild(contentElement);
    // 작성 날짜
    const createDateElement = document.createElement("p");
    createDateElement.classList.add("freeBoard__rootComment--createDate");
    createDateElement.textContent = createDate;
    document.getElementsByClassName("freeBoard__rootComment")[index].appendChild(createDateElement);

    // 버튼 컨테이너
    const buttonContainer = document.createElement("section");
    buttonContainer.classList.add("button__comment");
    document.getElementsByClassName("freeBoard__rootComment")[index].appendChild(buttonContainer);
    // 수정/삭제 버튼
    const buttonIndex =
      document.getElementsByClassName("freeBoard__rootComment").length +
      document.getElementsByClassName("freeBoard__childComment").length -
      1;
    // 해당 댓글을 작성한 유저일 때 수정하기, 삭제하기 버튼 추가
    const userResult = await getUserInfo();
    if (userResult !== LOGIN_REQUIRED && userResult.userIndex === userIndex) {
      const editButton = document.createElement("button");
      editButton.classList.add("button__comment--edit");
      editButton.textContent = "수정하기";
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("button__comment--delete");
      deleteButton.textContent = "삭제하기";

      document.getElementsByClassName("button__comment")[buttonIndex].appendChild(editButton);
      document.getElementsByClassName("button__comment")[buttonIndex].appendChild(deleteButton);
    }
    // 대댓글작성
    const writeChildCommentButton = document.createElement("button");
    writeChildCommentButton.classList.add("button__comment--write");
    writeChildCommentButton.textContent = "대댓글작성";
    document.getElementsByClassName("button__comment")[buttonIndex].appendChild(writeChildCommentButton);
  }

  // 대댓글 일때
  if (!isRoot) {
    // 대댓글 리스트 생성
    const listElement = document.createElement("li");
    listElement.classList.add("freeBoard__childComment");
    document.getElementsByClassName("freeBoard__comment")[0].appendChild(listElement);
    // 대댓글 순서
    const index = document.getElementsByClassName("freeBoard__childComment").length - 1;
    // 대댓글 작성자
    const nicknameElement = document.createElement("p");
    nicknameElement.classList.add("freeBoard__childComment--nickname");
    nicknameElement.textContent = nickname;
    document.getElementsByClassName("freeBoard__childComment")[index].appendChild(nicknameElement);
    // 대댓글 내용
    const contentElement = document.createElement("p");
    contentElement.classList.add("freeBoard__childComment--content");
    if (isDeleted) contentElement.textContent = "삭제된 댓글입니다.";
    if (!isDeleted) contentElement.textContent = commentContent;

    document.getElementsByClassName("freeBoard__childComment")[index].appendChild(contentElement);
    // 작성 날짜
    const createDateElement = document.createElement("p");
    createDateElement.classList.add("freeBoard__childComment--createDate");
    createDateElement.textContent = createDate;
    document.getElementsByClassName("freeBoard__childComment")[index].appendChild(createDateElement);

    // 버튼 컨테이너
    const buttonContainer = document.createElement("section");
    buttonContainer.classList.add("button__comment");
    document.getElementsByClassName("freeBoard__childComment")[index].appendChild(buttonContainer);
    // 수정/삭제 버튼
    // 해당 댓글을 작성한 유저일 때 수정하기, 삭제하기 버튼 추가
    const userResult = await getUserInfo();
    if (userResult !== LOGIN_REQUIRED && userResult.userIndex === userIndex) {
      const buttonIndex =
        document.getElementsByClassName("freeBoard__rootComment").length +
        document.getElementsByClassName("freeBoard__childComment").length -
        1;
      const editButton = document.createElement("button");
      editButton.classList.add("button__comment--edit");
      editButton.textContent = "수정하기";
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("button__comment--delete");
      deleteButton.textContent = "삭제하기";
      document.getElementsByClassName("button__comment")[buttonIndex].appendChild(editButton);
      document.getElementsByClassName("button__comment")[buttonIndex].appendChild(deleteButton);
    }
  }
}
// 댓글 무한 스크롤링
window.onscroll = async function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1) {
    const boardIndex = await getBoardIndex();
    let backendResult;
    backendResult = await getDetailComment(boardIndex, commentPage++);
    // 성공적으로 댓글 정보 불러왔을 때
    if (backendResult[0] !== undefined) {
      // 댓글 불러오기
      for (let index in backendResult) {
        for (let commentData of backendResult) {
          const { commentIndex, userIndex, isRoot, isDeleted, nickname, commentContent, createDate } = commentData;
          await addComment(commentIndex, userIndex, isRoot, isDeleted, nickname, commentContent, createDate);
        }
      }
      // 더 이상 불러올 댓글이 없을 때의 상황이 아닐 때(예상치 못한 오류)
    } else if (backendResult.state !== NO_COMMENT) {
      const result = await sweetAlert(
        ERROR,
        "댓글 불러오기 실패",
        "예상치 못한 오류입니다."`서버 메세지: ${backendResult.state}`
      );
    }
  }
};
// 해당 페이지에서 최초 한번 호출
async function lifeCycle() {
  await detailBoard();
  await detailComment();
}
lifeCycle();
