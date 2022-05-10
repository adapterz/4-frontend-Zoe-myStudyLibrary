// 유저 컨트롤러

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
export async function signUpGuideController(req, res) {}
// 1-2. 회원가입 요청
export async function signUpController(req, res) {}
// 1-3. 회원탈퇴 요청
export async function dropOutController(req, res) {}

// 2. 로그인/로그아웃
// 2-1. 로그인
export async function loginController(req, res) {}
// 2-2. 로그아웃
export async function logoutController(req, res) {}

// 3. 관심도서관 조회/등록/삭제
// 3-1. 관심도서관 조회
export async function userLibraryController(req, res) {}
// 3-2. 관심도서관 등록
export async function registerUserLibraryController(req, res) {}
// 3-3. 관심도서관 삭제
export async function deleteUserLibraryController(req, res) {}

// 4. 유저 정보 수정
// 4-1. 유저 프로필 - 닉네임 수정
export async function editProfileNicknameController(req, res) {}
// 4-2. 유저 프로필 - 이미지 수정
export async function editProfileImageController(req, res) {}
// 4-3. 회원정보 수정(연락처 수정)
export async function editPhoneNumberController(req, res) {}
// 4-4. 비밀번호 수정
export async function editPwController(req, res) {}

// 5. 유저 정보 가져오기
export async function getUserController(req, res) {}
