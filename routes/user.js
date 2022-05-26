// 유저 라우터
// 외장모듈
import express from "express";
// 내장모듈
import {
  signUpGuideController,
  signUpController, loginController
} from "../controllers/user.js";
// 라우터 변수
const router = express.Router();
/*
 * 1. 회원가입/탈퇴
 * 2. 로그인/(로그아웃 - 모델x)
 * 3. 관심도서관 조회/등록/탈퇴
 * 4. 유저 정보 수정
 * 5. 유저 정보 조회
 */
// 1. 회원가입/탈퇴
// 1-1. 회원가입 약관확인
router.get("/sign-up/guide", signUpGuideController)
// 1-2. 회원가입 페이지
router.get("/sign-up", signUpController)

// 1-3. 회원탈퇴 요청
// router.delete("/drop-out", dropOutController)

// 2. 로그인
// 2-1. 로그인 페이지
router.get("/login", loginController);
/*
// 3. 관심도서관 조회/등록/삭제
// 3-1. 관심도서관 조회
router.get("/user-lib", userLibraryController)
// 3-2. 관심도서관 등록
router.patch("/user-lib", registerUserLibraryController)
// 3-3. 관심도서관 삭제
router.delete("/user-lib", deleteUserLibraryController)

// 4. 유저 정보 수정
// 4-1. 내 닉네임 변경
router.patch("/profile/nickname", editProfileNicknameController)
// 4-2. 프로필 이미지 변경
router.patch("/profile/profileImage", editProfileImageController)
// 4-3. 연락처변경 요청
router.patch("/new-contact", editPhoneNumberController)
// 4-4. 비밀번호변경 요청
router.patch("/new-pw", editPwController)

// 5. 유저 정보 가져오기
router.get("/info", getUserController)

 */

// 모듈화
export default router;
