// 게시판 라우터
// 외장모듈
import express from "express"

// 내장모듈
import {
  editBoardController,
  deleteBoardController,
  detailBoardController,
  entireBoardController,
  favoriteBoardController,
  getRecentBoardController,
  searchBoardController,
  writeBoardController,
  getWriteController,
  userBoardController,
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
// 1-1. 최신글 자유게시판 5개, 공부인증샷 4개 정보
router.get("/get/", getRecentBoardController)
// 1-2. 전체 게시물 목록보기
router.get("/get/:category", entireBoardController)
// 1-3. 각 게시물 상세보기
router.get("/get/:category/:boardIndex", detailBoardController)

// 2. 게시글 작성/수정/삭제
// 2-1. 최초 게시글 작성 요청
router.post("/write", writeBoardController)
// 2-2. 수정시 기존 게시글 정보 가져오기
router.get("/write", getWriteController)
// 2-3. 게시글 수정 요청
router.patch("/write", editBoardController)
// 2-4. 게시물 삭제 요청
router.delete("/delete", deleteBoardController)

// 3. 좋아요/검색기능
// 3-1. 좋아요 기능
router.patch("/like", favoriteBoardController)
// 3-2. 검색관련 기능
router.get("/search/:category", searchBoardController)

// 4. 유저가 쓴 글 목록 가져오기
router.get("/user", userBoardController)

// 모듈화
export default router
