// 도서관 후기 라우터
// 외장모듈
import express from "express"
// 내장모듈
import {
  deleteReviewController,
  detailReviewController,
  editReviewController,
  getReviewController,
  registerReviewController,
  userReviewController,
} from "../controllers/review.js"
// 라우터 변수
const router = express.Router()

/*
 * 1. 도서관 후기 등록
 * 2. 도서관의 후기 정보
 * 3. 수정시 기존 후기 정보 불러오기
 * 4. 후기 수정 요청
 * 5. 후기 삭제 요청
 * 6. 유저가 작성한 후기 조회
 */

// 1. 후기 등록
router.post("/post", registerReviewController)

// 2. 도서관 후기 상세 조회
router.get("/detail", detailReviewController)

// 3. 수정 시 기존 후기 정보 불러오기
router.get("/", getReviewController)

// 4. 후기 수정 요청
router.patch("/patch", editReviewController)

// 5. 후기 삭제
router.delete("/delete", deleteReviewController)

// 6. 유저가 작성한 도서관 후기 목록 가져오기
router.get("/user", userReviewController)

// 모듈화
export default router
