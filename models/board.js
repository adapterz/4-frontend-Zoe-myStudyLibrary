// 게시판 모델
/*
 * 1. 게시글 조회
 * 2. 게시글 작성/수정/삭제
 * 3. 좋아요/검색 기능
 * 4. 유저가 작성한 게시글 조회
 */

// 1. 게시글 조회
// 1-1. 최신글 정보 가져오기
export async function getRecentBoardModel(ip) {}
// 1-2. 전체 게시글 정보 (글제목, 글쓴이(닉네임), 조회수, 좋아요 수, 작성날짜)
export async function entireBoardModel(ip) {}
// 1-3. 특정 게시글 상세보기
export async function detailBoardModel(ip) {}

// 2. 게시글 작성/수정/삭제
// 2-1. 게시글 최초 작성
export async function writeBoardModel(ip) {}
// 2-2. 게시글 수정시 기존 게시글 정보 불러오기
export async function getWriteModel(ip) {}
// 2-3. 게시글 수정 요청
export async function editBoardModel(ip) {}
// 2-4. 게시글 삭제 요청
export async function deleteBoardModel(ip) {}

// 3. 좋아요 요청/검색기능
// 3-1. 게시글 좋아요 요청
export async function favoriteBoardModel(ip) {}
// 3-2. 게시글 검색 기능
export async function searchBoardModel(ip) {}

// 4. 유저가 작성한 글 조회
export async function userBoardModel(ip) {}
