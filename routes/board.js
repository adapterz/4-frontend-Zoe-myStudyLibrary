// 게시판 라우터
// 외장모듈
import express from "express"

// 내장모듈
import {
  detailBoardController,
  entireBoardController,
  writeBoardController,
} from "../controllers/board.js"

// 라우터 변수
const router = express.Router()

// 1. 전체 게시물 목록보기
router.get("/", entireBoardController)
// 2. 최초 게시글 작성 요청
router.get("/write", writeBoardController)
// 3. 각 게시물 상세보기
router.get("/:boardIndex", detailBoardController)
// 모듈화
export default router
