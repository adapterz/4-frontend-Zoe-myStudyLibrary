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
async function signUp(id, pw, confirmPw, name, phoneNumber, nickname, gender) {
  const backendResult = await signUpRequest(id, pw, confirmPw, name, nickname, phoneNumber, gender);
  if (backendResult.error !== undefined) {
    await sweetAlert(
      WARNING,
      "회원가입 실패",
      "회원가입 시도를 다시 해주세요."`plz change ${backendResult.error}`
    );
  } else if (backendResult.state !== SIGN_UP) {
    await sweetAlert(
      WARNING,
      "회원가입 실패",
      "회원가입 시도를 다시 해주세요.",
      `서버 메시지: ${backendResult.state}`
    );
  }
  // 회원가입 성공 후 홈페이지로
  if (backendResult.state === SIGN_UP) {
    const result = await sweetAlert(SUCCESS, "회원가입 성공", "홈페이지로 이동합니다. 로그인 해주세요.");
    if (result) {
      const link = "/";
      location.href = link;
    }
  }
}
// 비밀번호와 비밀번호 확인이 같은지 확인
function checkValidation(confirm, pw) {
  if (pw.value === confirm.value) {
    confirm.setCustomValidity("");
  } else {
    confirm.setCustomValidity("비밀번호와 비밀번호확인이 일치하지 않습니다");
  }
  confirm.reportValidity();
}
async function lifeCycle(){
  await checkLogin();
}
lifeCycle();