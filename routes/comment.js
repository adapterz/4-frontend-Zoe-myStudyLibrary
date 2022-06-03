// 댓글 라우터
// 외장모듈
import express from "express"

// 내장모듈
import {
  userCommentController,
} from "../controllers/comment.js"


// 유저가 작성한 댓글 조회


// 라우터 변수
const router = express.Router()

// 6. 유저가 작성한 댓글 목록 조회
router.get("/user", userCommentController)

// 모듈화
export default router
