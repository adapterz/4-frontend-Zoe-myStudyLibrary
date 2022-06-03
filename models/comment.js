/*
 * 1. 댓글 작성
 * 2. 게시글의 댓글정보
 * 3. 수정시 기존댓글 불러오는 모듈
 * 4. 댓글 수정
 * 5. 댓글 삭제
 * 6. 유저가 작성한 댓글 조회
 */

// 1. 댓글 최초 작성
async function writeCommentRequest(boardIndex, _commentContent, parentIndex) {
  try {
    let backendResponse;
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
        content: _commentContent,
      }),
    };
    // 댓글 작성
    if (parentIndex === undefined)
      backendResponse = await fetch(`${BACKEND_URL}/comment/post?boardIndex=${boardIndex}`, options);
    // 대댓글 작성
    else
      backendResponse = await fetch(
        `${BACKEND_URL}/comment/post?boardIndex=${boardIndex}&parentIndex=${parentIndex}`,
        options
      );
    const status = backendResponse.status;
    // 댓글/대댓글 작성 성공
    if (status === CREATED) return { state: REQUEST_SUCCESS };
    // 댓글/대댓글 작성 실패
    const writeCommentResult = await backendResponse.json();
    return writeCommentResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}

// 2. 특정 게시글의 댓글 상세 조회
async function getDetailComment(boardIndex, page) {
  try {
    const options = {
      mode: "cors",
      credentials: "include",
    };
    // 쿼리스트링에 page 값이 없을 때
    if (page === undefined) {
      const backendResponse = await fetch(`${BACKEND_URL}/comment?boardIndex=${boardIndex}`, options);
      const getDetailReviewResult = await backendResponse.json();
      return getDetailReviewResult;
    }
    // 쿼리스트링에 page 값이 있을 때
    const backendResponse = await fetch(`${BACKEND_URL}/comment?boardIndex=${boardIndex}&page=${page}`, options);
    const getDetailReviewResult = await backendResponse.json();
    return getDetailReviewResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 3. 수정시 기존 댓글 정보 불러오기
async function getComment(boardIndex, commentIndex) {
  try {
    const options = {
      mode: "cors",
      method: GET,
      credentials: "include",
    };
    const backendResponse = await fetch(
      `${BACKEND_URL}/comment/edit?boardIndex=${boardIndex}&commentIndex=${commentIndex}`,
      options
    );
    const getCommentResult = await backendResponse.json();
    return getCommentResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 4. 댓글 수정 요청
async function editCommentRequest(boardIndex,commentIndex,_commentContent) {
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
        content:_commentContent
      }),
    };
    const backendResponse = await fetch(
      `${BACKEND_URL}/comment/edit?boardIndex=${boardIndex}&commentIndex=${commentIndex}`,
      options
    );
    const status = backendResponse.status;
    // 후기 수정 요청 성공
    if (status === OK) return { state: REQUEST_SUCCESS };
    // 후기 수정 요청 실패
    const editCommentResult = await backendResponse.json();
    return editCommentResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 5. 댓글 삭제
async function deleteCommentRequest(boardIndex, commentIndex) {
  const options = {
    mode: "cors",
    method: DELETE,
    credentials: "include",
  };
  const backendResponse = await fetch(
    `${BACKEND_URL}/comment/delete?boardIndex=${boardIndex}&commentIndex=${commentIndex}`,
    options
  );
  const status = backendResponse.status;
  // 성공적으로 댓글 삭제했을 때
  if (status === NO_CONTENT) return { state: REQUEST_SUCCESS };
  // 후기 댓글 실패
  const deleteReviewResult = await backendResponse.json();
  return deleteReviewResult;
}
// 6. 유저가 작성한 댓글 목록
async function userCommentRequest(page) {
  try {
    const options = {
      mode: "cors",
      method: GET,
      credentials: "include",
    };
    // 쿼리스트링에 들어갈 페이지 값이 없을 때
    if (page === undefined) {
      const backendResponse = await fetch(`${BACKEND_URL}/comment/user`, options);
      const userCommentResult = await backendResponse.json();
      return userCommentResult;
    }
    // 쿼리스트링에 들어갈 페이지 값이 있을 때
    const backendResponse = await fetch(`${BACKEND_URL}/comment/user?page=${page}`, options);
    const userCommentResult = await backendResponse.json();
    return userCommentResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
