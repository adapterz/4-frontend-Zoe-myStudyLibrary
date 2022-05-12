// 도서관 모델
// 외장모듈
import querystring from "query-string";
import fetch from "isomorphic-fetch";
// 내장모듈
import { BACKEND_URL } from "../customModule/constant.js";
import { OK } from "../customModule/statusCode.js";
/*
 * 1. 전체도서관 정보
 * 2. 입력한 지역의 도서관 정보
 * 3. 특정 인덱스의 도서관 정보
 */
// 1. 전체 도서관 정보 불러오는 모델
export async function allLibraryModel(ip) {
  try {
    const backendResponse = await fetch(BACKEND_URL + "/library", {
      credentials: "include",
      headers: {
        "Access-Control-Allow-Headers": " Referrer-Policy",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    });
    console.log(backendResponse);
    console.log(backendResponse.headers);
    const jsonData = await backendResponse.json();
    return jsonData;
  } catch {
    return { state: "fail_fetch" };
  }
}

// 2. 입력한 지역에 따라 도서관 정보주는 모델
export async function localLibraryModel(reqQuery, ip) {
  try {
    const backendResponse = await fetch(
      BACKEND_URL + "/library/search?" + decodeURIComponent(querystring.stringify(reqQuery)),
      {
        credentials: "include",
        headers: {
          "Access-Control-Allow-Headers": " Referrer-Policy",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
      }
    );
    const jsonData = await backendResponse.json();
    return jsonData;
  } catch {
    return { state: "fail_fetch" };
  }
}

// 3. 특정 도서관 정보 가져오는 모델
export async function detailLibraryModel(libraryIndex, ip) {
  try {
    const backendResponse = await fetch(BACKEND_URL + "/library/librarys/" + libraryIndex, {
      credentials: "include",
      headers: {
        "Access-Control-Allow-Headers": " Referrer-Policy",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    });
    const jsonData = await backendResponse.json();
    return jsonData;
  } catch {
    return { state: "fail_fetch" };
  }
}
