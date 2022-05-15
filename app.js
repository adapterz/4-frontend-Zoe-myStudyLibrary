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
import { moment } from "./customModule/dateTime.js";

// 라우터
import boardRouter from "./routes/board.js";
import commentRouter from "./routes/comment.js";
import libraryRouter from "./routes/library.js";
import reviewRouter from "./routes/review.js";
import userRouter from "./routes/user.js";
import wiseSayingRouter from "./routes/wise_saying.js";
import { OK } from "./customModule/statusCode.js";

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
app.use("/comment", commentRouter);
app.use("/library", libraryRouter);
app.use("/review", reviewRouter);
app.use("/user", userRouter);
app.use("/board", boardRouter);
app.use("/wise-saying", wiseSayingRouter);

// 정적 파일 경로
app.use("/data", express.static("data"));

// 서버 시작
app.listen(process.env.PORT, () => {
  console.log(("Start Frontend Server at" + moment().format(" YYYY-MM-DD HH:mm:ss")).rainbow.bold);
});

// es6 버전에서 __filename, __dirname 사용할 수 있게하기
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const basename = path.basename(__filename);

// 데이터가져오기
app.get("/get-data/library", (req, res) => {
  res.header({ "Content-Security-Policy": "default-src 'self'; connect-src http://localhost:13414" });
  res.status(OK).sendFile(path.join(__dirname, "data", "library.html"));
});
app.get("/get-data/user", (req, res) => {
  res.header({ "Content-Security-Policy": "default-src 'self'; connect-src http://localhost:13414" });
  res.status(OK).sendFile(path.join(__dirname, "data", "user.html"));
});
app.get("/get-data/wise-saying", (req, res) => {
  res.header({ "Content-Security-Policy": "default-src 'self'; connect-src http://localhost:13414" });
  res.status(OK).sendFile(path.join(__dirname, "data", "wise_saying.html"));
});
app.get("/get-data/review", (req, res) => {
  res.header({ "Content-Security-Policy": "default-src 'self'; connect-src http://localhost:13414" });
  res.status(OK).sendFile(path.join(__dirname, "data", "review.html"));
});
