// 명언 모델
// 내장모듈
import fetch from "isomorphic-fetch";
import { BACKEND_URL } from "../customModule/constant.js";

// 50가지의 명언 정보 중 랜덤하게 주기
export async function wiseSayingModel(ip) {
  try {
    const backendResponse = await fetch(BACKEND_URL + "/wise-saying");
    const jsonData = await backendResponse.json();
    return jsonData;
  } catch {
    return { state: "fail_fetch" };
  }
}
