// 게시판 컨트롤러
/*
 * 1. 게시글 조회
 * 2. 게시글 작성/수정/삭제
 * 3. 좋아요/검색 기능
 * 4. 유저가 작성한 글 조회
 *
 * 참고: models 메서드에 인자로 보낸 요청한 유저의 ip 정보는 models 수행 로그 남기는데 이용
 */
// 1. 게시글 조회
// 1-1. 최신 자유게시판 글 5개/공부인증샷 글 4개 불러오기
export async function getRecentBoardController(req, res) {}
// 1-2. 전체 게시물 보기
export async function entireBoardController(req, res) {}
// 1-3. 게시물 상세보기
export async function detailBoardController(req, res) {}

// 2. 게시글 작성/수정/삭제
// 2-1. 게시글 쓰기
export async function writeBoardController(req, res) {}
// 2-2. 게시글 수정을 위해 기존 게시글 정보 불러오기
export async function getWriteController(req, res) {}
// 2-3. 게시글 수정요청
export async function editBoardController(req, res) {}
// 2-4. 게시글 삭제하기
export async function deleteBoardController(req, res) {}

// 3. 좋아요/검색기능
// 3-1. 게시글 좋아요 요청
export async function favoriteBoardController(req, res) {}
// 3-2. 게시글 검색기능
export async function searchBoardController(req, res) {}

// 4. 유저가 작성한 글 조회
export async function userBoardController(req, res) {}

