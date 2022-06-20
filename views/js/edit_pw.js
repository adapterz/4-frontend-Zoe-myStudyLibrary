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
// 비밀번호 수정 버튼 눌렀을 때
async function editPw(pw, newPw, confirmPw) {
  const backendResult = await editPwRequest(pw, newPw, confirmPw);
  // 비밀번호 수정 성공시 홈페이지로 이동
  if (backendResult.state === REQUEST_SUCCESS) {
    const result = await sweetAlert(SUCCESS, "비밀번호 수정 성공", "홈페이지로 이동합니다");
    if (result) {
      const link = "/authorized";
      location.href = link;
    }
  } else if (backendResult.state === PW_MISMATCHED) {
    await sweetAlert(WARNING, "비밀번호 수정 실패", "현재 비밀번호가 일치하지 않습니다.");
  } else if (backendResult.state === NEW_PW_CONFIRM_MISMATCHED) {
    await sweetAlert(WARNING, "비밀번호 수정 실패", "새 비밀번호와 비밀번호 확인이 일치하지 않습니다");
  }
  // 현재 비밀번호 입력 틀렸거나 새 비밀번호/새비밀번호 확인이 일치하지 않을 때가 아닐 때
  else if (backendResult.state !== PW_MISMATCHED && backendResult.state !== NEW_PW_CONFIRM_MISMATCHED) {
    const result = await sweetAlert(
      ERROR,
      "비밀번호 수정 실패",
      "예상치 못한 오류입니다.",`서버 메세지: ${backendResult.state}`
    );
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
    confirm.setCustomValidity("새 비밀번호와 새 비밀번호확인이 일치하지 않습니다");
  }
  confirm.reportValidity();
}