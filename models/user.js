// 유저 모델
// 내장모듈
import fetch from "isomorphic-fetch";
import { INTERNAL_SERVER_ERROR, OK } from "../customModule/statusCode.js";

/*
 * 1. 회원가입/탈퇴
 * 2. 로그인/(로그아웃 - 모델x)
 * 3. 유저 관심도서관 조회/등록/탈퇴
 * 4. 유저 정보 수정
 * 5. 유저 정보 가져오기
 */
// 1. 회원가입/탈퇴
// 1-1. 회원가입 이용약관
export async function signUpGuideModel(ip) {
  try {
    const backendResponse = await fetch(BACKEND_URL + "/user/sign-up/guide", {
      credentials: "include",
      headers: {
        "Access-Control-Allow-Headers": " Referrer-Policy",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    });
    // 성공적으로 이용약관 정보 가져왔을 때 (응답값: html)
    if (backendResponse.status === OK) {
      const htmlData = await backendResponse.text();
      return { state: "OK", data: htmlData };
    }
    // 백엔드 서버에 예상치 못한 오류가 생겼을 때 (응답값: json)
    if (backendResponse.status === INTERNAL_SERVER_ERROR) {
      const jsonData = await backendResponse.json();
      return { state: "INTERNAL_SERVER_ERROR", data: jsonData };
    }
  } catch {
    return { state: "fail_fetch" };
  }
}
// 1-2. 회원가입
export async function signUpModel(reqBody, ip) {
  try {
    const backendResponse = await fetch(BACKEND_URL + "/user/sign-up", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Headers": "Content-Type, Referrer-Policy",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: JSON.stringify(reqBody),
    });
    const jsonData = await backendResponse.json();
    return jsonData;
  } catch {
    return { state: "fail_fetch" };
  }
}
// 1-3. 회원탈퇴
export async function dropOutModel(cookieToken, ip) {
  try {
    const backendResponse = await fetch(BACKEND_URL + "/user/drop-out", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Headers": " Referrer-Policy",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    });
    const jsonData = await backendResponse.json();
    console.log("header");
    console.log("header");
    console.log(backendResponse.headers);
    console.log(backendResponse.headers.get("set-cookie"));
    return jsonData;
  } catch {
    return { state: "fail_fetch" };
  }
}

// 2. 로그인/로그아웃
// 2-1. 로그인
export async function loginModel(reqBody, loginCookie, ip) {
  try {
    let backendResponse;
    if (loginCookie !== undefined) {
      backendResponse = await fetch(BACKEND_URL + "/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Headers": "Content-Type, Referrer-Policy",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: JSON.stringify(reqBody),
      });
    } else {
      backendResponse = await fetch(BACKEND_URL + "/user/login", {
        mode: "cors",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Headers": "Content-Type, Referrer-Policy",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: JSON.stringify(reqBody),
      });
    }
    console.log("header");
    console.log(backendResponse.headers);
    console.log("cookie");
    let cookie = backendResponse.headers.get('set-cookie');
    console.log('set-cookie header value', cookie);
    const jsonData = await backendResponse.json();
    return jsonData;
  } catch {
    return { state: "fail_fetch" };
  }
}
// 2-2. 로그아웃
export async function logoutModel(ip) {}

// 3. 내 관심도서관 조회/등록/탈퇴
// 3-1. 관심도서관 조회
export async function userLibraryModel(ip) {}
// 3-2. 관심도서관 등록
export async function registerUserLibraryModel(ip) {}
// 3-3. 관심도서관 삭제
export async function deleteUserLibraryModel(ip) {}

// 4. 유저 정보 수정
// 4-1. 프로필 - 닉네임 변경
export async function editProfileNicknameModel(ip) {}
// 4-2. 프로필 - 이미지 변경 모델
export async function editProfileImageModel(ip) {}
// 4-3. 연락처 변경 모델
export async function editPhoneNumberModel(ip) {}
// 4-4. 비밀번호 수정 요청 모델
export async function editPwModel(ip) {}

// 5. 유저 정보 가져오기
export async function getUserModel(ip) {}
