// 서버 url
const BACKEND_URL = "http://localhost:13414";
const FRONT_URL = "http://localhost:37866";
// HTTP 메서드
const GET = "GET";
const POST = "POST";
const PATCH = "PATCH";
const DELETE = "DELETE";
// 상태코드 상수화
const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;

const FAIL_FETCH = "fail_fetch";
const REQUEST_SUCCESS = "request_success";
// fetch 결과값
// 유저 정보
const LOGIN_REQUIRED = "login_required";

// 로그인
const LOGIN = "login";
const ALREADY_LOGIN = "already_login";
const LOGOUT = "logout";

// 회원가입
const SIGN_UP = "sign_up";

// 유효하지않은 body
const INVALID_BODY = "invalid_body";

// 비밀번호 수정
const PW_MISMATCHED = "pw_mismatched";
const NEW_PW_CONFIRM_MISMATCHED = "pw/pw_confirm_mismatched";

// 이미지 유효하지 않을 때
const ONLY_IMAGE = "only_jpg,jpeg,gjf,png(upper_5MB)_format_can_be_uploaded";

// 닉네임 수정
const DUPLICATED_NICKNAME = "duplicated_nickname";

// 리소스
const NOT_EXIST = "not_exist";
const NO_COMMENT = "no_comment";

// 특정 게시글 조회
const FAVORITE = "favorite +1";
const CANCEL_FAVORITE = "cancel_favorite";
const NOT_AUTHORIZATION = "not_authorization";

// sweetAlert icon
const INFO = "info";
const ERROR = "error";
const SUCCESS = "success";
const WARNING = "warning";
const QUESTION = "question";
