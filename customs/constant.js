// 서버 url
export const BACKEND_URL = await setBackendUrl();
export const FRONT_URL = await setFrontUrl();

// 상태코드 상수화
export const OK = 200;
export const CREATED = 201;
export const NO_CONTENT = 204;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const CONFLICT = 409;
export const INTERNAL_SERVER_ERROR = 500;

export const FAIL_FETCH = "fail_fetch";
export const REQUEST_SUCCESS = "request_success";
// fetch 결과값
// 유저 정보
export const LOGIN_REQUIRED = "login_required";

// 배포환경인지 개발환경인지에 따라 BACKEND_URL/FRONT_URL 분기처리
async function setBackendUrl() {
  if (process.env.NODE_ENV === "development") return "http://localhost:13414";
  if (process.env.NODE_ENV === "production") return "https://mystudylibrary.pe.kr:13414";
}
async function setFrontUrl() {
  if (process.env.NODE_ENV === "development") return "http://localhost:36383";
  if (process.env.NODE_ENV === "production") return "https://mystudylibrary.pe.kr";
}