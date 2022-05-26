// 로그인 여부 체크
async function checkLogin() {
  const result = await getUserInfo();
  // 로그인 안했을 때 로그인 창 있는 홈페이지로
  if (result.state === LOGIN_REQUIRED) {
    location.href = "/";
  }
}

// 로그인 버튼 눌렀을 때
async function login(id, pw) {
  const result = await loginRequest(id, pw);
  const resultJson = await result.json();
  // 로그인 성공 혹은 이미 로그인 된 상태일 때 홈페이지로 이동
  if (resultJson.state === LOGIN || resultJson.state === ALREADY_LOGIN) {
    const link = "/";
    location.href = link;
    alert(resultJson.state);
    // 로그인 필요할 때 다시 로그인 화면으로
  } else {
    const link = "/user/login";
    location.href = link;
    alert(resultJson.state);
  }
}
