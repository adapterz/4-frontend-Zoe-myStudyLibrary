let thisBoardIndex;
// 게시글 작성 html 에 쓰일 js 코드
// 제목 글자수 체크
async function checkTitleLength(titleElement) {
  const length = titleElement.value.length;
  document.getElementsByClassName("container__title--length")[0].innerHTML = `(${length}/50)`;
  // 50글자 이상일 때
  if (length >= 50) {
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
  // 유효하지 않은 조건에 걸리면 isValidated false 로 바꾸기, 마지막 조건에 isValidated 가 true 일 때 유효성 검사 통과시켜줌
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
        tagElement.setCustomValidity("하나의 태그는 2~8 글자 사이입니다.");
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
    await sweetAlert(ERROR, "글 작성 실패", "예상치 못한 에러입니다.", `서버 메시지: ${backendResult.state}`);
  }
}
// 최초 한번 게시글 수정 요청인지 최초 글 작성인지 확인
async function checkRequest() {
  const URLSearch = new URLSearchParams(location.search);
  for (const [key, valueString] of URLSearch) {
    // 쿼리스트링에 boardIndex 라는 키가 있고 그 값이 숫자 일때
    if (key === "boardIndex") {
      const value = Number(valueString);
      // boardIndex 의 값이 숫자일 때( 쿼리스트링이 유효할 때)
      if (!isNaN(value)) {
        thisBoardIndex = value;
        // 기존 게시글 정보 가져오는 요청
        const backendResult = await getPostRequest(valueString);
        // 로그인이 안돼있을 때
        if (backendResult.state === LOGIN_REQUIRED) {
          const result = await sweetAlert(WARNING, "로그인 필요", "로그인이 필요한 기능입니다.");
          if (result) {
            const link = "/user/login";
            location.href = link;
          }
        }
        // 게시글이 없을 때 게시글 목록으로 이동
        else if (backendResult.state === NOT_EXIST) {
          const result = await sweetAlert(
            WARNING,
            "존재하지 않는 게시글입니다.",
            "삭제되거나 존재하지 않는 게시글입니다."
          );
          if (result) location.href = "/board";
        }
        // 성공적으로 게시글 정보 가져왔을 때
        else if (backendResult.state === REQUEST_SUCCESS) {
          document.getElementsByClassName("freeBoard__title")[0].innerHTML = "자유게시판 - 글 수정";
          // 기존 게시글 데이터 input 창에 넣어주기
          // 제목, 내용
          const titleElement = document.getElementsByClassName("container__write--title")[0];
          const contentElement = document.getElementsByClassName("container__write--content")[0];
          titleElement.value = backendResult.dataOfBoard.postTitle;
          contentElement.value = backendResult.dataOfBoard.postContent;
          await checkTitleLength(titleElement);
          await checkContentLength(contentElement);
          // 태그
          let tags = ``;
          for (let tag of backendResult.dataOfTag) {
            tags = `${tags}#${tag.tag}`;
          }
          document.getElementsByClassName("container__write--tag")[0].value = tags;
          // 확인 버튼 눌렀을 때 게시글 수정요청 보내도록 하기
          document
            .getElementsByClassName("container__write")[0]
            .setAttribute(
              "onsubmit",
              "editPost(thisBoardIndex,document.getElementsByName('postTitle')[0].value,document.getElementsByName('postContent')[0].value,document.getElementsByName('tags')[0].value);return false"
            );
        }
        // 예상치 못한 오류
        else {
          await sweetAlert(ERROR, "기존 게시글 정보 불러오기 실패", "예상치 못한 에러입니다.", `서버 메시지: ${backendResult.state}`);
        }
      }
      // boardIndex 쿼리스트링 키가 있지만 값이 숫자가 아닐 때
      else {
        const result = await sweetAlert(WARNING, "잘못된 접근입니다.", "유효하지 않은 게시글 정보입니다..");
        if (result) location.href = "/board";
      }
    }
  }
}
// 글 수정 요청
async function editPost(boardIndex, postTitle, postContent, tags) {
  const backendResult = await editPostRequest(boardIndex, postTitle, postContent, tags);
  // 로그인 필요(시간이 지나 로그아웃 됐을 경우)
  if (backendResult.state === LOGIN_REQUIRED) {
    const result = await sweetAlert(WARNING, "로그인 필요", "로그인 해주세요");
    if(result) {
      location.href = "/user/login";
    }
  }
  // 존재하지 않는 게시글
  else if (backendResult.state === NOT_EXIST) {
    const result = await sweetAlert(WARNING, "존재하지 않는 게시글", "게시글 목록으로 이동");
    if (result) location.href = "/board";
  }
  // 글 수정 성공
  else if (backendResult.state === REQUEST_SUCCESS) {
    const result = await sweetAlert(SUCCESS, "글 수정 성공", "해당 게시글로 이동합니다.");
    if (result) location.href = `/board/${boardIndex}`;
  }
  // 그 외의 에러
  else {
    await sweetAlert(ERROR, "글 작성 실패", "예상치 못한 에러입니다.", `서버 메시지: ${backendResult.state}`);
  }
}
// 최초 한번 실행시켜줄 메서드
async function lifeCycle() {
  await checkRequest();
}
lifeCycle();
