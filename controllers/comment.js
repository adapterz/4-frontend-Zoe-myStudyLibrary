// 댓글 컨트롤러
import { BACKEND_URL, INTERNAL_SERVER_ERROR, OK } from "../customs/constant.js";
import path from "path";
import { __dirname } from "../app.js";

//  유저가 작성한 댓글 조회
export async function userCommentController(req, res) {
  try {
    res.header({
      "Content-Security-Policy": `default-src 'self'; connect-src ${BACKEND_URL}`,
    });
    res.header({
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com/ https://fonts.googleapis.com https://fonts.gstatic.com",
    });
    return res.status(OK).sendFile(path.join(__dirname, "views", "html", "user_comment.html"));
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}
