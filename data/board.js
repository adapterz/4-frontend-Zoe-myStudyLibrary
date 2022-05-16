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
