/*
 * 1. 게시글 조회
 * 2. 게시글 작성/수정/삭제
 * 3. 좋아요/검색 기능
 * 4. 유저가 작성한 글 조회
 */

// 1. 게시글 조회
// 1-1. 최신 자유게시판 글 5개 불러오기
async function getRecentBoard() {
  try {
    const options = {
      mode: "cors",
      credentials: "include",
    };
    const backendResponse = await fetch(`${BACKEND_URL}/board/get`, options);
    const recentBoardData = await backendResponse.json();
    // 성공적으로 데이터를 가져왔을 때
    if (backendResponse.status === OK) return recentBoardData[0];

    // 데이터 정보가져오는 것 실패
    return recentBoardData;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 1-2. 전체 게시글
async function getEntireBoard(page) {
  try {
    let backendResponse;
    const options = {
      mode: "cors",
      credentials: "include",
    };
    if (page === undefined) backendResponse = await fetch(`${BACKEND_URL}/board/get/free-bulletin`, options);
    else backendResponse = await fetch(`${BACKEND_URL}/board/get/free-bulletin?page=${page}`, options);
    const recentBoardData = await backendResponse.json();
    // 성공적으로 데이터를 가져왔을 때
    return recentBoardData;

    // 데이터 정보가져오는 것 실패
    return recentBoardData;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 1-3. 게시물 상세보기
async function getDetailBoard(boardIndex) {
  try {
    const options = {
      mode: "cors",
      credentials: "include",
    };
    const backendResponse = await fetch(`${BACKEND_URL}/board/get/free-bulletin/${boardIndex}`, options);
    const detailBoardData = await backendResponse.json();
    return detailBoardData;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 2. 게시글 작성/수정/삭제
// 2-1. 최초 게시글 작성 요청
async function reqWritePost(_postTitle, _postContent, _tags) {
  try {
    const options = {
      mode: "cors",
      method: POST,
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Headers": "Content-Type, Referrer-Policy",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: JSON.stringify({
        category: "자유게시판",
        postTitle: _postTitle,
        postContent: _postContent,
        tags: _tags,
      }),
    };
    const backendResponse = await fetch(`${BACKEND_URL}/board/write`, options);
    const status = backendResponse.status;
    // 게시글 작성 성공
    if (status === CREATED) return { state: REQUEST_SUCCESS };
    // 게시글 작성 실패
    const writePostResult = await backendResponse.json();
    return writePostResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 2-2. 게시글 수정을 위해 기존 게시글 정보 불러오기
async function getWrite(boardIndex) {
  try {
    const options = {
      mode: "cors",
      method: GET,
      credentials: "include",
    };
    const backendResponse = await fetch(`${BACKEND_URL}/board/write?boardIndex=${boardIndex}`, options);

    const writePostResult = await backendResponse.json();
    return writePostResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 2-3. 게시글 수정요청
async function editPost(boardIndex, _postTitle, _postContent, _tags) {
  try {
    const options = {
      mode: "cors",
      method: PATCH,
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Headers": "Content-Type, Referrer-Policy",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: JSON.stringify({
        category: "자유게시판",
        postTitle: _postTitle,
        postContent: _postContent,
        tags: _tags,
      }),
    };
    const backendResponse = await fetch(`${BACKEND_URL}/board/write?boardIndex=${boardIndex}`, options);
    // 성공적으로 수정했을 때
    if (backendResponse.status === OK) return { state: REQUEST_SUCCESS };
    // 수정 실패
    const editPostResult = backendResponse.json();
    return editPostResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}

// 2-4. 게시글 삭제하기
async function deletePost(boardIndex) {
  const options = {
    mode: "cors",
    method: DELETE,
    credentials: "include",
  };
  const backendResponse = await fetch(
    `${BACKEND_URL}/board/delete?boardIndex=${boardIndex}`,
    options
  );
  const status = backendResponse.status;
  // 성공적으로 후기 삭제했을 때
  if (status === NO_CONTENT) return { state: REQUEST_SUCCESS };
  // 후기 삭제 실패
  const deleteReviewResult = await backendResponse.json();
  return deleteReviewResult;
}