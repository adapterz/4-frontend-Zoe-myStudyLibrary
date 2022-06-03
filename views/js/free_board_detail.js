// url 에서 boardIndex 가져오기
async function getBoardIndex() {
  const url = location.href;
  const urlArray = url.split(`${FRONT_URL}/board/`);
  const boardIndex = urlArray[1];
  return boardIndex;
}
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

// 해당 페이지에서 최초 한번 호출
async function lifeCycle() {
  await detailBoard();
}
lifeCycle();
