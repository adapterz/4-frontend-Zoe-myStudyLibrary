// 유저 라우터
// 외장모듈
import express from "express";
// 내장모듈
import {
  signUpGuideController,
  signUpController,
  loginController,
  getUserController,
  termsController,
  dropOutController,
  editProfileNicknameController, editProfileImageController, editPhoneNumberController, editPwController
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
// 1-1. 회원가입 약관동의 페이지
router.get("/sign-up/guide", signUpGuideController)
// 1-2. 회원가입 약관 페이지
router.get("/sign-up/terms", termsController)
// 1-3. 회원가입 페이지
router.get("/sign-up", signUpController)

// 1-4. 회원탈퇴 페이지
router.get("/drop-out", dropOutController)

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
 */

// 4. 유저 정보 수정 페이지
// 4-1. 내 닉네임 변경 페이지
router.get("/edit-nickname", editProfileNicknameController)
// 4-2. 프로필 이미지 변경 페이지
router.get("/edit-profile-image", editProfileImageController)
// 4-3. 연락처변경 페이지
router.get("/edit-contact", editPhoneNumberController)
// 4-4. 비밀번호변경 페이지
router.get("/edit-pw", editPwController)

// 5. 유저 정보 페이지
router.get("/info", getUserController)

// 모듈화
export default router;
