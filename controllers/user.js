// 유저 컨트롤러
// 내장모듈
import { BAD_REQUEST, CONFLICT, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../customModule/statusCode.js";
import path from "path";
import { __dirname } from "../app.js";
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
// 1-1. 회원가입 약관 확인 페이지
export async function signUpGuideController(req, res) {
  try {
    res.header({
      "Content-Security-Policy": "default-src 'self'; connect-src http://localhost:13414",
    });
    res.header({
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://www.google.com https://fonts.googleapis.com https://fonts.gstatic.com",
    });
    return res.status(OK).sendFile(path.join(__dirname, "views", "html", "sign_up_guide.html"));
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}

// 1-2. 약관 가져오는 페이지
export async function termsController(req, res) {
  try {
    res.header({
      "Content-Security-Policy": "default-src 'self'; connect-src http://localhost:13414",
    });
    res.header({
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://www.google.com https://fonts.googleapis.com https://fonts.gstatic.com",
    });
    return res.status(OK).sendFile(path.join(__dirname, "views", "html", "terms.html"));
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}
// 1-3. 회원가입 페이지
export async function signUpController(req, res) {
  try {
    res.header({
      "Content-Security-Policy": "default-src 'self'; connect-src http://localhost:13414",
    });
    res.header({
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://www.google.com https://fonts.googleapis.com https://fonts.gstatic.com",
    });
    res.status(OK).sendFile(path.join(__dirname, "views", "html", "sign_up.html"));
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}
// 1-4. 회원탈퇴 페이지
export async function dropOutController(req, res) {
  try {
    // 백엔드 서버로부터 요청에 대한 응답받아오는 model 실행결과
    const modelResult = await dropOutModel(req.signedCookies.token, req.ip);
    console.log(modelResult.state);
  } catch {
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}

// 2. 로그인 페이지
export async function loginController(req, res) {
  try {
    res.header({
      "Content-Security-Policy": "default-src 'self'; connect-src http://localhost:13414",
    });
    res.header({
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://www.google.com https://fonts.googleapis.com https://fonts.gstatic.com",
    });
    res.status(OK).sendFile(path.join(__dirname, "views", "html", "login.html"));
  } catch (err) {
    console.log("loginControllerError:" + err);
    return res.status(INTERNAL_SERVER_ERROR).end();
  }
}
/*
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

 */
// 5. 유저 정보 페이지
export async function getUserController(req, res) {
  try {
    res.header({
      "Content-Security-Policy": "default-src 'self'; connect-src http://localhost:13414",
    });
    res.header({
      "Content-Security-Policy":
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://www.google.com https://fonts.googleapis.com https://fonts.gstatic.com",
    });
    res.status(OK).sendFile(path.join(__dirname, "views", "html", "user_info.html"));
  } catch (err) {
    console.log("loginControllerError:" + err);
  }
}

