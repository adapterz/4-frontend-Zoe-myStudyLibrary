// 유저 컨트롤러
// 내장모듈
import {
  deleteUserLibraryModel,
  dropOutModel,
  editPhoneNumberModel,
  editProfileImageModel,
  editProfileNicknameModel,
  editPwModel,
  getUserModel,
  loginModel,
  logoutModel,
  registerUserLibraryModel,
  signUpGuideModel,
  signUpModel,
  userLibraryModel,
} from "../models/user.js";
import { BAD_REQUEST, CONFLICT, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../customModule/statusCode.js";
/*
 * 1. 회원가입/탈퇴
 * 2. 로그인/로그아웃
 * 3. 관심도서관 조회/등록/탈퇴
 * 4. 유저 정보 수정
 * 5. 유저 정보 가져오기
 *
 * 참고: models 메서드에 인자로 보낸 요청한 유저의 ip 정보는 models 수행 로그 남기는데 이용
 */
// 1. 회원가입/탈퇴
// 1-1. 회원가입 약관 확인
export async function signUpGuideController(req, res) {
  try {
    // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
    const modelResult = await signUpGuideModel(req.ip);
    // 모델 실행 결과에 따른 분기처리
    // 백엔드 서버의 예상치 못한 오류
    if (modelResult.state === "INTERNAL_SERVER_ERROR") {
      console.log(modelResult.data);
      return res.status(INTERNAL_SERVER_ERROR).end();
    }
    // 성공적으로 이용약관 html 파일을 가져왔을 때
    if (modelResult.state === "OK") {
      console.log("##### 이용약관 html 데이터 ######".rainbow);
      console.log(modelResult.data);
      return res.status(OK).send(modelResult.data);
    }
  } catch {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}
// 1-2. 회원가입 요청
export async function signUpController(req, res) {
  try {
    // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
    const modelResult = await signUpModel(req.body, req.ip);
    // 회원가입 req.body 가 유효하지 않을 때
    if (modelResult.state === "invalid_body") {
      console.log("##### 회원가입: 유효하지 않은 body ######".rainbow);
      console.log("state: " + modelResult.state + "\n유효하지 않은 키값: " + modelResult.error);
      return res.status(BAD_REQUEST).end();
    }
    console.log("##### 회원가입 ######".rainbow);
    console.log("state:" + modelResult.state);
    // model 에서 fetch 메서드를 통해 백엔드 서버에서 데이터 가져오는 것을 실패했을 때
    if (modelResult.state === "fail-fetch") return res.status(INTERNAL_SERVER_ERROR).end();
    // 백엔드 서버의 sequelize query 메서드 실패
    if (modelResult.state === "fail_sequelize") return res.status(INTERNAL_SERVER_ERROR).json(modelResult);
    // 백엔드 서버의 예상치 못한 오류
    if (modelResult.state === "unexpected_error") return res.status(INTERNAL_SERVER_ERROR).end();
    // 이미 존재하는 id라 회원가입 불가능
    else if (modelResult.state === "already_exist_id") return res.status(BAD_REQUEST).json(modelResult);
    // 이미 존재하는 닉네임이라 회원가입 불가능
    else if (modelResult.state === "already_exist_nickname") return res.status(BAD_REQUEST).json(modelResult);
    // 비밀번호와 비밀번호확인이 일치하지 않을 때
    else if (modelResult.state === "pw/pw_confirm_mismatched") return res.status(BAD_REQUEST).json(modelResult);
    // 성공적으로 회원가입
    else if (modelResult.state === "sign_up") return res.status(CREATED).json(modelResult);
  } catch {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}
// 1-3. 회원탈퇴 요청
export async function dropOutController(req, res) {
  try {
    // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
    const modelResult = await dropOutModel(req.signedCookies.token, req.ip);
    console.log(modelResult.state);
  } catch {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}

// 2. 로그인/로그아웃
// 2-1. 로그인
export async function loginController(req, res) {
  try {
    // 기존에 로그인 돼있을 때
    // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
    const modelResult = await loginModel(req.body, req.signedCookies.token, req.ip);
    // 분기처리
    // 로그인 req.body 가 유효하지 않을 때
    if (modelResult.state === "invalid_body") {
      console.log("##### 로그인: 유효하지 않은 body ######".rainbow);
      console.log("state: " + modelResult.state + "\n유효하지 않은 키값: " + modelResult.error);
      return res.status(BAD_REQUEST).end();
    }
    // 이미 로그인 됐을 때
    if (modelResult.state === "already_login") return res.status(CONFLICT).end();
    if (modelResult.state === "fail-fetch")
      // model 에서 fetch 메서드를 통해 백엔드 서버에서 데이터 가져오는 것을 실패했을 때
      return res.status(INTERNAL_SERVER_ERROR).json(modelResult);
    // 백엔드 서버의 sequelize query 메서드 실패
    if (modelResult.state === "fail_sequelize") return res.status(INTERNAL_SERVER_ERROR).json(modelResult);
    // 백엔드 서버의 예상치 못한 오류
    if (modelResult.state === "unexpected_error") return res.status(INTERNAL_SERVER_ERROR).json(modelResult);
    // 백엔드 서버의 DB에 해당 사용자가 로그인 요청한 id가 없을 때
    if (modelResult.state === "no_matching_id") return res.status(NOT_FOUND).json(modelResult);
    // 백엔드 서버의 DB에 id는 존재하지만 id에 대한 pw가 일치하지 않을 때
    else if (modelResult.state === "pw_mismatched") return res.status(BAD_REQUEST).json(modelResult);
    // 성공적으로 로그인 요청 수행
    // 헤더필드에 쿠키 전달
    console.log("##### 로그인######".rainbow);
    console.log(modelResult.cookie);
    res.set("set-cookie", modelResult.cookie);
    return res.status(OK).end();
  } catch (err) {
    console.log(err);
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}
// 2-2. 로그아웃
export async function logoutController(req, res) {
  // 기존에 로그인 돼있을 때
  const loginToken = req.signedCookies.token;
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await logoutModel(loginToken, req.ip);
}

// 3. 관심도서관 조회/등록/삭제
// 3-1. 관심도서관 조회
export async function userLibraryController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await userLibraryModel(req.ip);
}
// 3-2. 관심도서관 등록
export async function registerUserLibraryController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await registerUserLibraryModel(req.ip);
}
// 3-3. 관심도서관 삭제
export async function deleteUserLibraryController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await deleteUserLibraryModel(req.ip);
}

// 4. 유저 정보 수정
// 4-1. 유저 프로필 - 닉네임 수정
export async function editProfileNicknameController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await editProfileNicknameModel(req.ip);
}
// 4-2. 유저 프로필 - 이미지 수정
export async function editProfileImageController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await editProfileImageModel(req.ip);
}
// 4-3. 회원정보 수정(연락처 수정)
export async function editPhoneNumberController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await editPhoneNumberModel(req.ip);
}
// 4-4. 비밀번호 수정
export async function editPwController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await editPwModel(req.ip);
}

// 5. 유저 정보 가져오기
export async function getUserController(req, res) {
  // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
  const modelResult = await getUserModel(req.ip);
}
