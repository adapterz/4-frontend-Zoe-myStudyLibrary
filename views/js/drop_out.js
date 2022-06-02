// 로그인 여부 체크
async function checkLogin() {
  const result = await getUserInfo();
  // 로그인 안 했을 때 다른 경로로 이동
  if (result.state === LOGIN_REQUIRED) {
    location.href = "/";
  }
}
checkLogin();
// 회원탈퇴 버튼 눌렀을 때
async function dropOut() {
  const backendResult = await dropOutRequest();
  // 회원탈퇴 성공 시 홈페이지로 이동
  if (backendResult.state === REQUEST_SUCCESS) {
    const result = await sweetAlert(SUCCESS, "회원탈퇴 성공", "홈페이지로 이동합니다.");
    if (result) {
      const link = "/";
      location.href = link;
    }
  } else {
    const result = await sweetAlert(
      ERROR,
      "회원탈퇴 실패",
      "홈페이지로 이동합니다. 다시 시도해주세요.",
      `서버메시지: ${backendResult.state}`
    );
    if (result) {
      const link = "/";
      location.href = link;
    }
  }
}
