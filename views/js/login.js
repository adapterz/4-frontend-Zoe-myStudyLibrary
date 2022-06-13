// 로그인 여부 체크
async function checkLogin() {
  const result = await getUserInfo();
  // 로그인 이미 했을 때 다른 경로로 이동
  if (result.state !== LOGIN_REQUIRED) {
    const result = await sweetAlert(ERROR, "기존에 로그인된 상태", "홈페이지로 이동합니다");
    if (result) {
      const link = "/authorized";
      location.href = link;
    }
  }
}
// 로그인 버튼 눌렀을 때
async function login(id, pw) {
  const serverResult = await loginRequest(id, pw);
  // 로그인 성공
  if (serverResult.state === LOGIN) {
    const result = await sweetAlert(SUCCESS, "로그인 성공", "홈페이지로 이동합니다");
    if (result) location.href="/authorized";

  }
  // 로그인 된 상태일 때 홈페이지로 이동
  else if (serverResult.state === ALREADY_LOGIN) {
    const result = await sweetAlert(ERROR, "기존에 로그인된 상태", "홈페이지로 이동합니다");
    if (result) {
      const link = "/authorized";
      location.href = link;
    }
    // 그 외의 상황
  } else {
    const result = await sweetAlert(
      WARNING,
      "로그인 실패",
      "로그인 시도를 다시 해주세요.",
      `서버 메세지: ${serverResult.state}`
    );
    if (result) {
      const link = "/user/login";
      location.href = link;
    }
  }
}
async function lifeCycle(){
  await checkLogin();
}
lifeCycle();