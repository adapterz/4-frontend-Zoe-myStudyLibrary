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

/*
 * 1. 게시글 조회
 * 2. 게시글 작성/수정/삭제
 * 3. 좋아요/검색 기능
 * 4. 유저가 작성한 글 목록 조회
 */

// 유효성 검사를 위한 모듈
// 1. 게시글 조회
// 1-2. 전체 게시물 목록보기
router.get("/", entireBoardController)
// 1-3. 각 게시물 상세보기
router.get("/:boardIndex", detailBoardController)

// 2. 게시글 작성/수정/삭제
// 2-1. 최초 게시글 작성 요청
router.post("/write", writeBoardController)
// 모듈화
export default router
