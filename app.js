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

import http from "http";
import https from "https";
import * as fs from "fs";

// 사이트맵 생성

// 내장모듈
// 날짜/시간 관련 모듈
import { moment } from "./customs/dateTime.js";
// js 파일 빌드
import { build } from "./customs/buildJs.js";
// 라우터
import boardRouter from "./routes/board.js";
import commentRouter from "./routes/comment.js";
// import libraryRouter from "./routes/library.js";
import reviewRouter from "./routes/review.js";
import userRouter from "./routes/user.js";
import { BACKEND_URL, OK } from "./customs/constant.js";

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
// app.use("/library", libraryRouter);
app.use("/review", reviewRouter);
app.use("/user", userRouter);
app.use("/board", boardRouter);

// es6 버전에서 __filename, __dirname 사용할 수 있게하기
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const basename = path.basename(__filename);

// 빌드
if (process.env.NODE_ENV === "development:build") {
  build();
}

// 서버 시작
if (process.env.NODE_ENV === "development") {
  http.createServer(app).listen(process.env.PORT, () => {
    console.log(("Start Frontend Server at" + moment().format(" YYYY-MM-DD HH:mm:ss")).rainbow.bold);
  });
}
if (process.env.NODE_ENV === "production") {
  const options = {
    key: fs.readFileSync("/etc/letsencrypt/live/mystudylibrary.pe.kr/privkey.pem", "utf-8"),
    cert: fs.readFileSync("/etc/letsencrypt/live/mystudylibrary.pe.kr/cert.pem", "utf-8"),
    ca: fs.readFileSync("/etc/letsencrypt/live/mystudylibrary.pe.kr/chain.pem", "utf-8"),
  };
  https.createServer(options, app).listen(process.env.PORT, () => {
    console.log(("Start HTTPS Frontend Server" + moment().format(" YYYY-MM-DD HH:mm:ss")).rainbow.bold);
  });
}

// 정적 파일 경로
app.use("/views", express.static(path.join(__dirname, "views")));
app.use("/models", express.static(path.join(__dirname, "models")));
app.use("/customs", express.static(path.join(__dirname, "customs")));

// 홈
// 로그인 했을 때
app.get("/", (req, res) => {
  res.header({
    "Content-Security-Policy": `default-src 'self'; connect-src ${BACKEND_URL}`,
  });
  res.header({
    "Content-Security-Policy":
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://fonts.googleapis.com https://fonts.gstatic.com",
  });
  res.status(OK).sendFile(path.join(__dirname, "views", "html", "home_not_login.html"));
});
// 로그인 안했을 때
app.get("/authorized", (req, res) => {
  res.header({
    "Content-Security-Policy": `default-src 'self'; connect-src ${BACKEND_URL}`,
  });
  res.header({
    "Content-Security-Policy":
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://fonts.googleapis.com https://fonts.gstatic.com",
  });
  res.status(OK).sendFile(path.join(__dirname, "views", "html", "home_login.html"));
});
// robots.txt 추가
app.use("/robots.txt", function (req, res) {
  res.type("text/plain");
  res.send("User-agent: *\nAllow: /");
});
// sitemap 추가
app.get("/sitemap.xml", (req, res) => {
  res.sendFile(__dirname + "/sitemap.xml");
});