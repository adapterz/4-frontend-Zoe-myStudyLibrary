// 게시글 작성 html 에 쓰일 js 코드
// 제목 글자수 체크
async function checkTitleLength(titleElement) {
  const length = titleElement.value.length;
  document.getElementsByClassName("container__title--length")[0].innerHTML = `(${length}/50)`;
  // 50글자 이상일 때
  if (length > 50) {
    // 50글자 넘었을 때 49글자 짤라서 제목 입력창에 넣어주기
    const substring = titleElement.value.substring(0, 49);
    titleElement.value = substring;
    const length = titleElement.value.length;
    document.getElementsByClassName("container__title--length")[0].innerHTML = `(${length}/50)`;
    await sweetAlert(WARNING, "글자수 초과", "제목은 50자 까지만 입력가능합니다.");
  }
}
// 내용 글자수 체크
async function checkContentLength(contentElement) {
  const length = contentElement.value.length;
  document.getElementsByClassName("container__content--length")[0].innerHTML = `(${length}/5000)`;
  // 5000글자 이상일 때
  if (length >= 5000) {
    // 5000글자 넘었을 때 49글자 짤라서 제목 입력창에 넣어주기
    const substring = contentElement.value.substring(0, 4999);
    contentElement.value = substring;
    const length = contentElement.value.length;
    document.getElementsByClassName("container__content--length")[0].innerHTML = `(${length}/5000)`;
    await sweetAlert(WARNING, "글자수 초과", "내용은 5000자 까지만 입력가능합니다.");
  }
}
// 태그 체크
async function checkTagValidation(tagElement) {
  // TODO isValidated 에 대한 설명
  let isValidated = true;
  const tagArray = tagElement.value.split("#");
  tagArray.shift();
  // 유효성 체크
  if (tagElement.value.length === 0) {
    tagElement.setCustomValidity("");
    tagElement.reportValidity();
    return;
  }
  // 첫 글자 #으로 시작하는지
  if (tagElement.value.substring(0, 1) !== "#") {
    tagElement.setCustomValidity("첫글자는 #으로 시작해주세요.");
    isValidated = false;
  }
  // 태그 배열만들었을 때 태그 배열 개수가 5개가 넘는지
  else if (tagArray.length > 5) {
    tagElement.setCustomValidity(`태그는 최대 5개까지입니다. 현재 태그 개수: ${tagArray.length}`);
    isValidated = false;
  }
  // 2~8글자 사이 한국어로만 이루어져있는지
  else {
    for (let tag of tagArray) {
      if (tag.length < 2 || tag.length > 8) {
        tagElement.setCustomValidity("하나는 태그는 2~8 글자 사이입니다.");
        isValidated = false;
      } else {
        const isMatched = /^[가-힣]+$/.test(tag);
        if (!isMatched) {
          tagElement.setCustomValidity("태그는 한글로만 작성해주세요(+ 가(o)ㄱ(x))");
          isValidated = false;
        }
      }
    }
  }
  if (isValidated) {
    tagElement.setCustomValidity("");
  }
  tagElement.reportValidity();
}
// 글 작성 버튼 클릭시
async function writePost(postTitle, postContent, tag) {
  const backendResult = await writePostRequest(postTitle, postContent, tag);
  // 로그인 필요(시간이 지나 로그아웃 됐을 경우)
  if (backendResult.state === LOGIN_REQUIRED) {
    const result = await sweetAlert(WARNING, "로그인 필요", "새 창에서 로그인 해주세요");
    window.open("/user/login");
  }

  // 글 작성 성공
  if (backendResult.state === REQUEST_SUCCESS) {
    const result = await sweetAlert(SUCCESS, "글 작성 성공", "글 목록으로 이동합니다.");
    if (result) {
      const link = "/board";
      location.href = link;
    }
  }
  // 그 외의 에러
  if (backendResult.state !== LOGIN_REQUIRED && backendResult.state !== REQUEST_SUCCESS) {
    await sweetAlert(
      ERROR,
      "글 작성 실패",
      "예상치 못한 에러입니다.",
      `서버 메시지: ${backendResult.state}`
    );
  }
}
