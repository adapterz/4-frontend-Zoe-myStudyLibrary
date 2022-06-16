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
// 폼 제출할 때 호출할 메서드
async function submitForm(ev) {
  ev.preventDefault();
  const file = document.getElementById("container__editProfileImage--button");
  const formData = new FormData();
  formData.append("profileImage", file.files[0]);
  await editProfileImage(formData);
}
// 이미지 업로드 이벤트 시 호출할 메서드(미리보기)
async function previewImage(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    // 유저가 업로드 한 사진 읽어오기
    reader.onload = (e) => {
      const previewImage = document.getElementsByClassName("container__editProfileImage--img")[0];
      previewImage.src = e.target.result;
      previewImage.alt ="유저가 등록한 사진.";
    };
    reader.readAsDataURL(input.files[0]);
  }
}
// 프로필 수정 버튼 눌렀을 때
async function editProfileImage(profileImageForm) {
  const backendResult = await editProfileImageRequest(profileImageForm);
  // 프로필 수정 성공시 홈페이지로 이동
  if (backendResult.state === REQUEST_SUCCESS) {
    const result = await sweetAlert(SUCCESS, "프로필 사진 수정 성공", "홈페이지로 이동합니다");
    if (result) {
      const link = "/authorized";
      location.href = link;
    }
  } else if (backendResult.state === ONLY_IMAGE) {
    await sweetAlert(WARNING, "프로필 사진 수정 실패", "5MB 이하 이미지 파일만 업로드 가능합니다.(jpg,jpeg,png,gjf)");
  }
  // 5mb 이하의 이미지파일이 아니라서 요청거부된 상황이 아닐 때 (ex. 백엔드 서버의 문제, fetch 실패 등)
  else if (backendResult.state !== ONLY_IMAGE) {
    const result = await sweetAlert(
      ERROR,
      "프로필 사진 수정 실패",
      "예상치 못한 오류입니다.",
      `서버 메세지: ${backendResult.state}`
    );
    if (result) {
      const link = "/";
      location.href = link;
    }
  }
}
// 폼 제출시
document.addEventListener("DOMContentLoaded", () => {
  document.getElementsByClassName("container__editProfileImage")[0].addEventListener("submit", submitForm);
});
// 최초 한 번 호출해주는 함수
async function lifeCycle() {
  await checkLogin();
  // 프로필 사진 수정시 제출시
  document.getElementById("container__editProfileImage--button").addEventListener("change", (e) => {
    previewImage(e.target);
  });
}
lifeCycle();
