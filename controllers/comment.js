// 댓글 컨트롤러
// 내장모듈
import {
  deleteCommentModel,
  detailCommentModel,
  editCommentModel,
  getCommentModel, userCommentModel,
  writeCommentModel
} from "../models/comment.js";

/*
 * 1. 댓글 작성
 * 2. 게시글의 댓글정보
 * 3. 수정시 기존댓글 불러오는 모듈
 * 4. 댓글 수정
 * 5. 댓글 삭제
 * 6. 유저가 작성한 댓글 조회
 *
 * 참고: models 메서드에 인자로 보낸 요청한 유저의 ip 정보는 models 수행 로그 남기는데 이용
 */

// 1. 댓글 최초 작성
export async function writeCommentController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await writeCommentModel(req.ip);
}

// 2. 게시글의 댓글 정보
export async function detailCommentController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await detailCommentModel(req.ip);
}

// 3. 수정시 기존 댓글 정보 불러오기
export async function getCommentController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await getCommentModel(req.ip);
}

// 4. 댓글 수정 요청
export async function editCommentController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await editCommentModel(req.ip);
}

// 5. 댓글 삭제
export async function deleteCommentController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await deleteCommentModel(req.ip);
}

// 6. 유저가 작성한 댓글 조회
export async function userCommentController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await userCommentModel(req.ip);
}
