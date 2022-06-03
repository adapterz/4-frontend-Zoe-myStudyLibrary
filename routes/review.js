// 도서관 후기 라우터
// 외장모듈
import express from "express"
// 내장모듈
import {
  userReviewController,
} from "../controllers/review.js"
// 라우터 변수
const router = express.Router()
// 유저가 작성한 도서관 후기 목록 가져오기
router.get("/user", userReviewController)

// 모듈화
export default router
