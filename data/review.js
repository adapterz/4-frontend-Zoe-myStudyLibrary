/*
 * 1. 도서관 후기 등록
 * 2. 도서관의 후기 정보
 * 3. 수정시 기존 후기 정보 불러오기
 * 4. 후기 수정 요청
 * 5. 후기 삭제 요청
 * 6. 유저가 작성한 후기 조회
 */

// 도서관 후기 등록하는 모델
async function reqRegisterReview(libraryIndex, _reviewContent, _grade) {
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
        reviewContent: _reviewContent,
        grade: _grade,
      }),
    };
    const backendResponse = await fetch(`${BACKEND_URL}/review/post?libraryIndex=${libraryIndex}`, options);
    const status = backendResponse.status;
    // 리뷰 작성 성공
    if (status === CREATED) return { state: REQUEST_SUCCESS };
    // 리뷰 작성 실패
    const registerReviewResult = await backendResponse.json();
    return registerReviewResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 특정 도서관의 후기 상세 조회
async function getDetailReview(libraryIndex, page) {
  try {
    const options = {
      mode: "cors",
      credentials: "include",
    };
    // 쿼리스트링에 page 값이 없을 때
    if (page === -1) {
      const backendResponse = await fetch(`${BACKEND_URL}/review/detail?libraryIndex=${libraryIndex}`, options);
      const getDetailReviewResult = await backendResponse.json();
      return getDetailReviewResult;
    }
    // 쿼리스트링에 page 값이 있을 때
    const backendResponse = await fetch(
      `${BACKEND_URL}/review/detail?libraryIndex=${libraryIndex}&page=${page}`,
      options
    );
    const getDetailReviewResult = await backendResponse.json();
    return getDetailReviewResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}

// 3. 수정시 기존 댓글 정보 불러오기
async function getReview(libraryIndex, reviewIndex) {
  try {
    const options = {
      mode: "cors",
      method: GET,
      credentials: "include",
    };
    const backendResponse = await fetch(
      `${BACKEND_URL}/review?libraryIndex=${libraryIndex}&reviewIndex=${reviewIndex}`,
      options
    );
    const getReviewResult = await backendResponse.json();
    return getReviewResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 4. 후기 수정 요청
async function editReview(libraryIndex, reviewIndex, _reviewContent, _grade) {
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
        reviewContent: _reviewContent,
        grade: _grade,
      }),
    };
    const backendResponse = await fetch(
      `${BACKEND_URL}/review/patch?libraryIndex=${libraryIndex}&reviewIndex=${reviewIndex}`,
      options
    );
    const status = backendResponse.status;
    // 후기 수정 요청 성공
    if (status === OK) return { state: REQUEST_SUCCESS };
    // 후기 수정 요청 실패
    const editReviewResult = await backendResponse.json();
    return editReviewResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 5. 후기 삭제
async function deleteReview(libraryIndex, reviewIndex) {
  const options = {
    mode: "cors",
    method: DELETE,
    credentials: "include",
  };
  const backendResponse = await fetch(
    `${BACKEND_URL}/review/delete?libraryIndex=${libraryIndex}&reviewIndex=${reviewIndex}`,
    options
  );
  const status = backendResponse.status;
  // 성공적으로 후기 삭제했을 때
  if (status === NO_CONTENT) return { state: REQUEST_SUCCESS };
  // 후기 삭제 실패
  const deleteReviewResult = await backendResponse.json();
  return deleteReviewResult;
}
// 6. 유저가 작성한 후기 목록
async function getUserReview(page) {
  try {
    const options = {
      mode: "cors",
      method: GET,
      credentials: "include",
    };
    // 쿼리스트링에 들어갈 페이지 값이 없을 때
    if (page === undefined) {
      const backendResponse = await fetch(`${BACKEND_URL}/review/user`, options);
      const userReviewResult = await backendResponse.json();
      return userReviewResult;
    }
    // 쿼리스트링에 들어갈 페이지 값이 있을 때
    const backendResponse = await fetch(`${BACKEND_URL}/review/user?page=${page}`, options);
    const userReviewResult = await backendResponse.json();
    return userReviewResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
