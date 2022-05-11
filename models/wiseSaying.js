// 명언 모델
// 내장모듈
import fetch from "node-fetch";
import { BACKEND_URL } from "../customModule/constant.js";

// 50가지의 명언 정보 중 랜덤하게 주기
export async function wiseSayingModel(ip) {
  const backendResponse = await fetch(BACKEND_URL + "/wise-saying");
  const jsonData = await backendResponse.json();
  return jsonData;
}
