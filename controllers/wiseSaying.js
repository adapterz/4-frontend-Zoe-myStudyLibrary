// 명언 컨트롤러
/*
 * 1. 랜덤으로 명언 정보 가져오는 컨트롤러
 *
 * 참고: models 메서드에 인자로 보낸 요청한 유저의 ip 정보는 models 수행 로그 남기는데 이용
 */

// 1. 랜덤한 명언 정보 가져오는 컨트롤러
export async function wiseSayingController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await wiseSayingModel(req.ip);
}
