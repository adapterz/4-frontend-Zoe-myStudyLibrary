// 도서관 컨트롤러
// 내장모듈
import { allLibraryModel, detailLibraryModel, localLibraryModel } from "../models/library.js";

/*
 * 1. 전체도서관 정보
 * 2. 입력한 지역의 도서관 정보
 * 3. 특정 인덱스의 도서관 정보
 *
 * 참고: models 메서드에 인자로 보낸 요청한 유저의 ip 정보는 models 수행 로그 남기는데 이용
 */

// 1. 전체 도서관 정보
export async function allLibraryController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await allLibraryModel(req.ip);
}

// 2. 내가 사는 지역을 입력하면 주변 도서관 정보를 주는 메서드
export async function localLibraryController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await localLibraryModel(req.ip);
}

// 3. 특정 도서관인덱스의 도서관 정보 응답
export async function detailLibraryController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await detailLibraryModel(req.ip);
}
