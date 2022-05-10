// 도서관 모델
// 외장모듈
import fetch from "node-fetch";
import querystring from "query-string";
// 내장모듈
import { BACKEND_URL } from "../customModule/constant.js";
/*
 * 1. 전체도서관 정보
 * 2. 입력한 지역의 도서관 정보
 * 3. 특정 인덱스의 도서관 정보
 */
// 1. 전체 도서관 정보 불러오는 모델
export async function allLibraryModel(ip) {
  const backendResponse = await fetch(BACKEND_URL + "/library", {});
  const jsonData = await backendResponse.json();
  console.log(jsonData);
}

// 2. 입력한 지역에 따라 도서관 정보주는 모델
export async function localLibraryModel(reqQuery, ip) {
  const backendResponse = await fetch(
    BACKEND_URL + "/library/search?" + decodeURIComponent(querystring.stringify(reqQuery))
  );
  const jsonData = await backendResponse.json();
  console.log(jsonData);
}

// 3. 특정 도서관 정보 가져오는 모델
export async function detailLibraryModel(libraryIndex, ip) {
  const backendResponse = await fetch(BACKEND_URL + "/library/librarys/" + libraryIndex);
  const jsonData = await backendResponse.json();
  console.log(jsonData);
}
