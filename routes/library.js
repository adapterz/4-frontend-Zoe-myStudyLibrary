// 도서관 라우터
// 외장모듈
import express from "express";
// 내장모듈
import { allLibraryController, detailLibraryController, localLibraryController } from "../controllers/library.js";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { OK } from "../customModule/statusCode.js";

// 라우터 변수
const router = express.Router();

/*
 * 1. 전체도서관 정보
 * 2. 입력한 지역의 도서관 정보
 * 3. 특정 인덱스의 도서관 정보
 */

// 1. 전체도서관 정보
/*
router.get("/", (req, res) => {
  res.header({ "Content-Security-Policy": "default-src 'self'; connect-src http://localhost:13414" });
  res.status(OK).sendFile(path.join(__dirname, "..", "public", "library.html"));
});

 */

// 2. 내 지역의 도서관 정보(시도명, 시군구명 body 로 보내기)
//router.get("/search", localLibraryController);

// 3. 특정 도서관 자세히 보기
//router.get("/librarys/:libraryIndex", detailLibraryController);

// 모듈화
export default router;
