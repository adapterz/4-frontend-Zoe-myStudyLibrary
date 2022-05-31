// 로그인 여부 체크
async function checkLogin() {
  const backendResult = await getUserInfo();
  // 로그인 안 했을 때 로그인 페이지로 이동
  if (backendResult.state === LOGIN_REQUIRED) {
    const result = await sweetAlert(WARNING, "로그인 필요", "로그인이 필요한 기능입니다.");
    if (result) {
      const link = "/user/login";
      location.href = link;
    }
  }
}
checkLogin();
// 연락처 수정 버튼 눌렀을 때
async function editContact(contact) {
  const backendResult = await editContactRequest(contact);
  // 연락처 수정 성공시 홈페이지로 이동
  if (backendResult.state === REQUEST_SUCCESS) {
    const result = await sweetAlert(SUCCESS, "연락처 수정 성공", "홈페이지로 이동합니다");
    if (result) {
      const link = "/authorized";
      location.href = link;
    }
    // 연락처 수정 실패
  } else if (backendResult.state === INVALID_BODY) {
    await sweetAlert(WARNING, "연락처 수정 실패", `010 0000 0000 형태로 입력해주세요`);
  } else {
    await sweetAlert(ERROR, "연락처 수정 실패", "예상치 못한 에러입니다", `서버 메시지: ${backendResult.state}`);
  }
}
