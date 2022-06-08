// 게시판 컨트롤러
import { INTERNAL_SERVER_ERROR, OK, BACKEND_URL } from "../customs/constant.js";
import path from "path";
import { __dirname } from "../app.js";

// 1. 게시판 목록 페이지
export async function entireBoardController(req, res) {
  try {
    res.header({
      "Content-Security-Policy": `default-src 'self'; connect-src ${BACKEND_URL}`,
    });
    res.header({
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com/ https://fonts.googleapis.com https://fonts.gstatic.com",
    });
    return res.status(OK).sendFile(path.join(__dirname, "views", "html", "free_board.html"));
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}
// 2. 특정 게시글 조회 페이지
export async function detailBoardController(req, res) {
  try {
    res.header({
      "Content-Security-Policy": `default-src 'self'; connect-src ${BACKEND_URL}`,
    });
    res.header({
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com/ https://fonts.googleapis.com https://fonts.gstatic.com",
    });
    return res.status(OK).sendFile(path.join(__dirname, "views", "html", "free_board_detail.html"));
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}
// 3. 게시글 작성 페이지
export async function writeBoardController(req, res) {
  try {
    res.header({
      "Content-Security-Policy": `default-src 'self'; connect-src ${BACKEND_URL}`,
    });
    res.header({
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com/ https://fonts.googleapis.com https://fonts.gstatic.com",
    });
    return res.status(OK).sendFile(path.join(__dirname, "views", "html", "free_board_write.html"));
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}
// 4. 유저가 작성한 게시글 조회
export async function userBoardController(req, res) {
  try {
    res.header({
      "Content-Security-Policy": `default-src 'self'; connect-src ${BACKEND_URL}`,
    });
    res.header({
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com/ https://fonts.googleapis.com https://fonts.gstatic.com",
    });
    return res.status(OK).sendFile(path.join(__dirname, "views", "html", "user_post.html"));
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}
