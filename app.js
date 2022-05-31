// 외장모듈
// express 모듈 가져오기
import express from "express";
// req.body 사용에 필요한 'body-parser' 미들웨어
import bodyParser from "body-parser";
// 컨텐츠 보안 정책에 따른 'helmet' 미들웨어 사용
import helmet from "helmet";
// console 로그 예쁘게 쓰기
import colors from "colors";
// 쿠키 모듈
import cookieParser from "cookie-parser";
// 디도스 방어 모듈
import rateLimit from "express-rate-limit";
// dotenv 모듈
import "dotenv/config.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// 내장모듈
// 날짜/시간 관련 모듈
import { moment } from "./customs/dateTime.js";

// 라우터
import boardRouter from "./routes/board.js";
// import commentRouter from "./routes/comment.js";
// import libraryRouter from "./routes/library.js";
// import reviewRouter from "./routes/review.js";
import userRouter from "./routes/user.js";
import { OK } from "./customs/statusCode.js";

// 각종 모듈 설정
// 디도스 방어 모듈 설정(요청 제한)
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 25000,
  standardHeaders: true,
  legacyHeaders: false,
});

// 서버 설정
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(helmet());
app.use(apiLimiter);

// 경로별로 라우팅
// app.use("/comment", commentRouter);
// app.use("/library", libraryRouter);
// app.use("/review", reviewRouter);
app.use("/user", userRouter);
app.use("/board", boardRouter);


// 서버 시작
app.listen(process.env.PORT, () => {
  console.log(("Start Frontend Server at" + moment().format(" YYYY-MM-DD HH:mm:ss")).rainbow.bold);
});

// es6 버전에서 __filename, __dirname 사용할 수 있게하기
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const basename = path.basename(__filename);

// 정적 파일 경로
app.use("/views", express.static(path.join(__dirname, "views")));
app.use("/models", express.static(path.join(__dirname, "models")));
app.use("/customs", express.static(path.join(__dirname, "customs")));

// 홈
// 로그인 했을 때
app.get("/", (req, res) => {
  res.header({
    "Content-Security-Policy": "default-src 'self'; connect-src http://localhost:13414",
  });
  res.header({
    "Content-Security-Policy":
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://fonts.googleapis.com https://fonts.gstatic.com",
  });
  res.status(OK).sendFile(path.join(__dirname, "views", "html", "home(not_login).html"));
});
// 로그인 안했을 때
app.get("/authorized", (req, res) => {
  res.header({
    "Content-Security-Policy": "default-src 'self'; connect-src http://localhost:13414",
  });
  res.header({
    "Content-Security-Policy":
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://fonts.googleapis.com https://fonts.gstatic.com",
  });
  res.status(OK).sendFile(path.join(__dirname, "views", "html", "home(login).html"));
});
