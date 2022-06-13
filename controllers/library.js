// 도서관 컨트롤러
// 내장모듈
import { BACKEND_URL,OK,INTERNAL_SERVER_ERROR } from "../customs/constant.js";
import path from "path";
import { __dirname } from "../app.js";
/*
 * 1. 전체도서관 정보
 * 2. 입력한 지역의 도서관 정보
 * 3. 특정 인덱스의 도서관 정보
 *
 * 참고: models 메서드에 인자로 보낸 요청한 유저의 ip 정보는 models 수행 로그 남기는데 이용
 */

// 1. 전체 도서관 정보
export async function libraryController(req, res) {
  try {
    res.header({
      "Content-Security-Policy": `default-src 'self'; connect-src ${BACKEND_URL}`,
    });
    res.header({
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com/ https://fonts.googleapis.com https://fonts.gstatic.com",
    });
    return res.status(OK).sendFile(path.join(__dirname, "views", "html", "library.html"));
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}
// 2. 특정 도서관 정보 자세히 보기
export async function detailLibraryController(req, res) {
  try {
    res.header({
      "Content-Security-Policy": `default-src 'self'; connect-src ${BACKEND_URL}`,
    });
    res.header({
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com/ https://fonts.googleapis.com https://fonts.gstatic.com",
    });
    return res.status(OK).sendFile(path.join(__dirname, "views", "html", "library_detail.html"));
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}