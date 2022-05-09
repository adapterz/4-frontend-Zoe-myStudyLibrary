// 외장모듈
// express 모듈 가져오기
import express from "express"
// req.body 사용에 필요한 'body-parser' 미들웨어
import bodyParser from "body-parser"
// 컨텐츠 보안 정책에 따른 'helmet' 미들웨어 사용
import helmet from "helmet"
// console 로그 예쁘게 쓰기
import colors from "colors"
// 디도스 방어 모듈
import rateLimit from "express-rate-limit"
// dotenv 모듈
import "dotenv/config.js"

// 내장모듈
// 날짜/시간 관련 모듈
import { moment } from "./customModule/dateTime.js"

// 라우터
import boardRouter from "./routes/board.js"
import commentRouter from "./routes/comment.js"
import libraryRouter from "./routes/library.js"
import reviewRouter from "./routes/review.js"
import userRouter from "./routes/user.js"
import wiseSayingRouter from "./routes/wiseSaying.js"

// 각종 모듈 설정
// 디도스 방어 모듈 설정(요청 제한)
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 25000,
  standardHeaders: true,
  legacyHeaders: false,
})

// 서버 설정
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extends: false }))
app.use(helmet())
app.use(apiLimiter)

// 경로별로 라우팅
app.use("/comment", commentRouter)
app.use("/library", libraryRouter)
app.use("/review", reviewRouter)
app.use("/user", userRouter)
app.use("/board", boardRouter)
app.use("/wise-saying", wiseSayingRouter)

// 서버 시작
app.listen(process.env.PORT, () => {
  console.log(("Start Lib Server at" + moment().format(" YYYY-MM-DD HH:mm:ss")).rainbow.bold)
})
