// 게시판 컨트롤러
// 내장모듈
/*
 * 1. 게시글 조회
 * 2. 게시글 작성/수정/삭제
 * 3. 좋아요/검색 기능
 * 4. 유저가 작성한 글 조회
 *
 * 참고: models 메서드에 인자로 보낸 요청한 유저의 ip 정보는 models 수행 로그 남기는데 이용
 */
// 1. 게시글 조회
// 1-2. 전체 게시물 보기
import { INTERNAL_SERVER_ERROR, OK } from "../customs/statusCode.js";
import path from "path";
import { __dirname } from "../app.js";

export async function entireBoardController(req, res) {
  try {
    res.header({
      "Content-Security-Policy": "default-src 'self'; connect-src http://localhost:13414",
    });
    res.header({
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://www.google.com https://fonts.googleapis.com https://fonts.gstatic.com",
    });
    return res.status(OK).sendFile(path.join(__dirname, "views", "html", "free_board.html"));
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}
// 1-3. 게시물 상세보기
export async function detailBoardController(req, res) {
  try {
    res.header({
      "Content-Security-Policy": "default-src 'self'; connect-src http://localhost:13414",
    });
    res.header({
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://www.google.com https://fonts.googleapis.com https://fonts.gstatic.com",
    });
    return res.status(OK).sendFile(path.join(__dirname, "views", "html", "free_board_detail.html"));
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}

// 2. 게시글 작성/수정/삭제
// 2-1. 게시글 쓰기
export async function writeBoardController(req, res) {
  try {
    res.header({
      "Content-Security-Policy": "default-src 'self'; connect-src http://localhost:13414",
    });
    res.header({
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://www.google.com https://fonts.googleapis.com https://fonts.gstatic.com",
    });
    return res.status(OK).sendFile(path.join(__dirname, "views", "html", "free_board_write.html"));
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}
