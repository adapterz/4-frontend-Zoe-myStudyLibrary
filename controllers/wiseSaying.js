// 명언 컨트롤러
// 내장모듈
import { wiseSayingModel } from "../models/wiseSaying.js";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../customModule/statusCode.js";
/*
 * 1. 랜덤으로 명언 정보 가져오는 컨트롤러
 *
 * 참고: models 메서드에 인자로 보낸 요청한 유저의 ip 정보는 models 수행 로그 남기는데 이용
 */

// 1. 랜덤한 명언 정보 가져오는 컨트롤러

export async function wiseSayingController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await wiseSayingModel(req.ip);
  // 모델 실행 결과값에 따라 분기처리
  // sequelize query 메서드 실패
  if (modelResult.state === "fail_sequelize") return res.status(INTERNAL_SERVER_ERROR).json(modelResult);
  // 명언 리소스 찾는 것을 실패했을 때
  if (modelResult.state === "not_exist") return res.status(NOT_FOUND).json(modelResult);
  // 성공적으로 명언 정보 가져왔을 때
  console.log("##### 명언정보 ######".rainbow);
  console.log(modelResult.wiseSayingContent);
  console.log(modelResult.celebrity);
  return res.status(OK).json(modelResult);
}
