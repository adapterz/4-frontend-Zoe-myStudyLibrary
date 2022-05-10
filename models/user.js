// 유저 모델
/*
 * 1. 회원가입/탈퇴
 * 2. 로그인/(로그아웃 - 모델x)
 * 3. 유저 관심도서관 조회/등록/탈퇴
 * 4. 유저 정보 수정
 * 5. 유저 정보 가져오기
 */
// 1. 회원가입/탈퇴
// 1-1. 회원가입 이용약관
export async function signUpGuideModel(ip) {}
// 1-2. 회원가입
export async function signUpModel(ip) {}
// 1-3. 회원탈퇴
export async function dropOutModel(ip) {}

// 2. 로그인/로그아웃
// 2-1. 로그인
export async function loginModel(ip) {}
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
