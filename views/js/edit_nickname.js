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
// 닉네임 수정 버튼 눌렀을 때
async function editNickname(nickname) {
  const backendResult = await editNicknameRequest(nickname);
  // 닉네임 수정 성공시 홈페이지로 이동
  if (backendResult.state === REQUEST_SUCCESS) {
    const result = await sweetAlert(SUCCESS, "닉네임 수정 성공", "홈페이지로 이동합니다");
    if (result) {
      const link = "/authorized";
      location.href = link;
    }
  } else if (backendResult.state === DUPLICATED_NICKNAME) {
    await sweetAlert(WARNING, "닉네임 수정 실패", "중복된 닉네임 입니다.");
  }
  // 닉네임 중복 상황이 아닌데 닉네임 수정이 안될 때(서버 오류, 로그인 요구 등)
  else {
    const result = await sweetAlert(
      ERROR,
      "닉네임 수정 실패",
      "예상치 못한 오류입니다.",
      `서버 메세지: ${backendResult.state}`
    );
    if (result) {
      const link = "/";
      location.href = link;
    }
  }
}