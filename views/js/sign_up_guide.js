let isRead = false;
// 약관버튼 눌러봤는지 확인하는 유효성 검사
function checkValidation(check) {
  if (!isRead) {
    check.setCustomValidity("약관을 읽어주세요");
    document.getElementsByClassName("container__signUpGuide--agree")[0].checked=false;
  } else check.setCustomValidity("");
  confirm.reportValidity();
}
// 약관 확인창 눌러봤는지 여부 변경, 체크박스 활성화
async function readTerms() {
  window.open("/user/sign-up/terms");
  isRead = true;
}
