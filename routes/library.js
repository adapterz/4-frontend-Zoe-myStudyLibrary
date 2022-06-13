// 도서관 라우터
// 외장모듈
import express from "express";
// 내장모듈
import { detailLibraryController, libraryController } from "../controllers/library.js";

// 라우터 변수
const router = express.Router();

// 1. 전체 도서관 목록보기
router.get("/", libraryController);

// 2. 특정 도서관 정보 자세히 보기
router.get("/:libraryIndex", detailLibraryController);

// 모듈화
export default router;
