// 도서관 후기 컨트롤러
// 내장모듈
import {
  deleteReviewModel,
  detailReviewModel,
  editReviewModel,
  getReviewModel,
  registerReviewModel, userReviewModel
} from "../models/review.js";

/*
 * 1. 도서관 후기 등록
 * 2. 도서관의 후기 정보
 * 3. 수정시 기존 후기 정보 불러오기
 * 4. 후기 수정 요청
 * 5. 후기 삭제 요청
 * 6. 유저가 작성한 후기 조회
 *
 * 참고: models 메서드에 인자로 보낸 요청한 유저의 ip 정보는 models 수행 로그 남기는데 이용
 */

// 1. 특정 도서관 이용 후 후기 등록
export async function registerReviewController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 models 실행결과
  const modelResult = await registerReviewModel(req.ip);
}

// 2. 도서관의 후기 정보
export async function detailReviewController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 models 실행결과
  const modelResult = await detailReviewModel(req.ip);
}

// 3. 수정시 기존 댓글 정보 불러오기
export async function getReviewController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 models 실행결과
  const modelResult = await getReviewModel(req.ip);
}

// 4. 후기 수정 요청
export async function editReviewController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 models 실행결과
  const modelResult = await editReviewModel(req.ip);
}

// 5. 후기 삭제
export async function deleteReviewController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 models 실행결과
  const modelResult = await deleteReviewModel(req.ip);
}

// 6. 유저가 작성한 후기 조회
export async function userReviewController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 models 실행결과
  const modelResult = await userReviewModel(req.ip);
}
