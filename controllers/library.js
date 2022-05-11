// 도서관 컨트롤러
// 내장모듈
import { allLibraryModel, detailLibraryModel, localLibraryModel } from "../models/library.js";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../customModule/statusCode.js";
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
  console.log("##### 전체도서관 로그 찍기 ######".rainbow);
  const modelResult = await allLibraryModel(req.ip);
  // 모델 실행결과에 따른 분기처리
  // sequelize query 메서드 실패
  if (modelResult.state === "fail_sequelize") return res.status(INTERNAL_SERVER_ERROR).json(modelResult);

  // 전체 도서관 정보 응답
  console.log("##### 성공시 첫번째 도서관 정보 ######".rainbow);
  console.log(modelResult[0].libraryName);
  console.log(modelResult[0].libraryType);
  console.log(modelResult[0].districts);
  console.log(modelResult[0].address);
  console.log(modelResult[0].closeDay);
  console.log(modelResult[0].weekdayOperateTime);
  console.log(modelResult[0].saturdayOperateTime);
  console.log(modelResult[0].holidayOperateTime);
  console.log(modelResult[0].libraryContact);
  console.log(modelResult[0].averageGrade);
  return res.status(OK).json(modelResult);
}

// 2. 내가 사는 지역을 입력하면 주변 도서관 정보를 주는 메서드
export async function localLibraryController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await localLibraryModel(req.query, req.ip);
  // 모델 실행 결과에 따른 분기처리
  // 유효하지 않은 req.query(queryString) 으로 요청했을 때
  if (modelResult.state === "invalid_params_or_query") {
    console.log("##### 해당 queryString 이 유효하지 않을 때 ######".rainbow);
    console.log(modelResult.state);
    return res.status(OK).json(modelResult);
  }
  // sequelize query 메서드 실패
  if (modelResult.state === "fail_sequelize") return res.status(INTERNAL_SERVER_ERROR).json(modelResult);
  // 도서관 정보가 없을 때(올바른 요청이지만 안타깝게도 정보가 존재하지 않을 때)
  if (modelResult.state === "non_existent_library") {
    console.log("##### 해당 queryString 값에 일치하는 검색 정보가 없을 때 ######".rainbow);
    console.log(modelResult.state);
    return res.status(OK).json(modelResult);
  }
  // 도서관 정보가 있을 때 도서관 정보 응답
  console.log("##### 지역 도서관 검색 : 첫번째 도서관 정보 ######".rainbow);
  console.log(modelResult[0].libraryName);
  console.log(modelResult[0].libraryType);
  console.log(modelResult[0].districts);
  console.log(modelResult[0].address);
  console.log(modelResult[0].closeDay);
  console.log(modelResult[0].weekdayOperateTime);
  console.log(modelResult[0].saturdayOperateTime);
  console.log(modelResult[0].holidayOperateTime);
  console.log(modelResult[0].libraryContact);
  console.log(modelResult[0].averageGrade);
  return res.status(OK).json(modelResult);
}

// 3. 특정 도서관인덱스의 도서관 정보 응답
export async function detailLibraryController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await detailLibraryModel(req.params.libraryIndex, req.ip);
  // 모델 실행 결과에 따른 분기처리
  // 유효하지 않은 req.params 으로 요청했을 때
  if (modelResult.state === "invalid_params_or_query") {
    console.log("##### 해당 libraryIndex 매개변수가 유효하지 않을 때 ######".rainbow);
    console.log(modelResult.state);
    return res.status(OK).json(modelResult);
  }
  // sequelize query 메서드 실패
  if (modelResult.state === "fail_sequelize") return res.status(INTERNAL_SERVER_ERROR).json(modelResult);
  // 해당 도서관 정보가 존재하지 않거나 삭제됐을 때
  else if (modelResult.state === "non_existent_library") {
    console.log("##### 해당 인덱스의 도서관 리소스가 존재하지 않을 때 ######".rainbow);
    console.log(modelResult.state);
    return res.status(NOT_FOUND).json(modelResult);
  }
  // 성공적으로 해당 도서관 정보 응답
  console.log("##### 특정인덱스의 도서관 정보 ######".rainbow);
  console.log(modelResult.libraryName);
  console.log(modelResult.libraryType);
  console.log(modelResult.districts);
  console.log(modelResult.address);
  console.log(modelResult.closeDay);
  console.log(modelResult.weekdayOperateTime);
  console.log(modelResult.saturdayOperateTime);
  console.log(modelResult.holidayOperateTime);
  console.log(modelResult.libraryContact);
  console.log(modelResult.countOfGrade);
  console.log(modelResult.averageGrade);
  return res.status(OK).json(modelResult);
}
