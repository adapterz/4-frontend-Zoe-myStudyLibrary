let reviewPage = 2;
// url 에서 도서관 인덱스 가져오기
async function getLibraryIndex() {
  const url = location.href;
  const urlArray = url.split(`${FRONT_URL}/library/`);
  const libraryIndex = urlArray[1];
  return libraryIndex;
}
// 특정 인덱스 도서관 정보 가져오기
async function detailLibrary() {
  // 백엔드 서버에서 해당 도서관 정보 가져오기
  const libraryIndex = await getLibraryIndex();
  const libraryResult = await getDetailLibraryData(libraryIndex);
  // 성공적으로 도서관 정보 가져왔을 때
  if (libraryResult.state === undefined) {
    // 도서관 정보 페이징에 넣기

    const {
      libraryName,
      libraryType,
      address,
      closeDay,
      weekdayOperateTime,
      saturdayOperateTime,
      holidayOperateTime,
      libraryContact,
      countOfGrade,
      averageGrade,
    } = libraryResult;
    document.getElementsByClassName("library__data--name")[0].innerHTML = libraryName;
    document.getElementsByClassName("library__data--type")[0].innerHTML = libraryType;
    document.getElementsByClassName("library__data--address")[0].innerHTML = address;
    document.getElementsByClassName("library__data--closeDay")[0].innerHTML = closeDay;
    document.getElementsByClassName("library__data--weekOperateTime")[0].innerHTML = weekdayOperateTime;
    document.getElementsByClassName("library__data--saturdayOperateTime")[0].innerHTML = saturdayOperateTime;
    document.getElementsByClassName("library__data--holidayOperateTime")[0].innerHTML = holidayOperateTime;
    document.getElementsByClassName("library__data--contact")[0].innerHTML = libraryContact;
    document.getElementsByClassName("review__info--count")[0].innerHTML = `${countOfGrade} 개`;
    document.getElementsByClassName("review__info--grade")[0].innerHTML = `${averageGrade}`;
  }
}
// 리뷰 작성 버튼 눌렀을 때
async function writeReview() {
  // 로그인 여부 체크
  const checkLogin = await getUserInfo();
  if (checkLogin.state === LOGIN_REQUIRED) {
    const result = await sweetAlert(WARNING, "로그인 필요", "로그인 해주세요");
    if (result) location.href = "/user/login";
  }
  const { isConfirmed: isConfirmed, value: formValues } = await Swal.fire({
    title: "평점 등록",
    html:
      '<select id="swal-input1" class="swal2-select"><optgroup label="평점">평점</optgroup><option value="5">⭐⭐⭐⭐⭐</option><option value="4">⭐⭐⭐⭐</option value="3"><option>⭐⭐⭐</option><option value="2">⭐⭐</option><option value="1">⭐</option></select>' +
      '<textarea id="swal-input2" class="swal2-textarea" placeholder="2~100자 사이로 작성">',
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      const review = document.getElementById("swal-input2").value;
      // 후기 유효성 검사(2~100자 사이가 아닐 때
      if (review.length < 2 || review.length > 100) {
        Swal.showValidationMessage(`후기는 2~100자 사이로 작성해야합니다. 현재 ${review.length}자 입니다.`);
      } else return [document.getElementById("swal-input1").value, review];
    },
  });
  // 후기 작성 요청했을 때
  if (isConfirmed) {
    const review = formValues[1];
    const grade = formValues[0];
    const libraryIndex = await getLibraryIndex();
    const backendResult = await registerReviewRequest(libraryIndex, review, grade);
    console.log(backendResult);
    // 작성 성공
    if (backendResult.state === REQUEST_SUCCESS) {
      const result = await sweetAlert(SUCCESS, "후기 작성 성공!", "🤩");
      if (result) location.reload();
    }
    // 로그인 필요
    else if (backendResult.state === LOGIN_REQUIRED) {
      const result = await sweetAlert(WARNING, "로그인 필요", "로그인 해주세요");
      if (result) location.href = "/user/login";
    }
    // 오류
    else {
      // 후기를 작성한 적 있을 때
      if (backendResult.state === "already_written") {
        const result = await sweetAlert(WARNING, "중복 작성 시도", "한 도서관에 하나의 후기만 작성할 수 있습니다.");
      } else {
        const result = await sweetAlert(
          ERROR,
          "후기 작성 실패",
          "예상치 못한 오류입니다.",
          `서버 메세지: ${backendResult.state}`
        );
        if (result) location.reload();
      }
    }
  }
  // 후기 작성창 취소나 무시
  else await sweetAlert(CHECK, "후기 작성 취소", "warning");
} // 최초 도서관 후기정보 가져오기
async function getReview() {
  const libraryIndex = await getLibraryIndex();
  const backendResult = await getDetailReview(libraryIndex);
  // 성공적으로 도서관 정보 조회
  if (backendResult.state === undefined) {
    for (const reviewData of backendResult) {
      await addReview(reviewData);
    }
    // 더 이상 불러올 후기가 없을 때의 상황이 아닐 때(예상치 못한 오류)
  } else if (backendResult.state !== NO_REVIEW) {
    const result = await sweetAlert(
      ERROR,
      "후기 불러오기 실패",
      "예상치 못한 오류입니다.",
      `서버 메세지: ${backendResult.state}`
    );
    if (result) location.reload();
  }
}
// 리뷰 컴포넌트 추가
async function addReview(reviewData) {
  const { reviewIndex, nickname, reviewContent, grade, createDate } = reviewData;

  // 후기 리스트 생성
  const listElement = document.createElement("li");
  listElement.classList.add("review__container--list");
  document.getElementsByClassName("review__container")[0].appendChild(listElement);
  // 후기 순서
  const index = document.getElementsByClassName("review__container--list").length - 1;
  // 후기 평점
  const gradeElement = document.createElement("p");
  gradeElement.classList.add("review__container--grade");
  let star = "";
  for (let cnt = 0; cnt < 5; ++cnt) {
    if (cnt < grade) star += "★";
    else star += "☆";
  }
  gradeElement.textContent = star;
  document.getElementsByClassName("review__container--list")[index].appendChild(gradeElement);
  // 후기 작성자
  const nicknameElement = document.createElement("p");
  nicknameElement.classList.add("review__container--nickname");
  nicknameElement.textContent = nickname;
  document.getElementsByClassName("review__container--list")[index].appendChild(nicknameElement);
  // 후기 내용
  const contentElement = document.createElement("p");
  contentElement.classList.add("review__container--content");
  contentElement.textContent = reviewContent;
  document.getElementsByClassName("review__container--list")[index].appendChild(contentElement);
  // 작성 날짜
  const createDateElement = document.createElement("p");
  createDateElement.classList.add("review__container--createDate");
  createDateElement.textContent = createDate;
  document.getElementsByClassName("review__container--list")[index].appendChild(createDateElement);
  // 수정 삭제 버튼 추가
  const buttonContainer = document.createElement("section");
  buttonContainer.classList.add("button__review");
  document.getElementsByClassName("review__container--list")[index].appendChild(buttonContainer);
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("review__container--delete");
  deleteButton.innerHTML = "삭제하기";
  deleteButton.setAttribute("reviewIndex", reviewIndex);
  deleteButton.setAttribute("onclick", "deleteReview(this.getAttribute('reviewIndex'))");
  const editButton = document.createElement("button");
  editButton.classList.add("review__container--delete");
  editButton.innerHTML = "수정하기";
  editButton.setAttribute("reviewIndex", reviewIndex);
  editButton.setAttribute("onclick", "editReview(this.getAttribute('reviewIndex'))");
  document.getElementsByClassName("button__review")[index].appendChild(deleteButton);
  document.getElementsByClassName("button__review")[index].appendChild(editButton);
}
// 후기 삭제 버튼
async function deleteReview(reviewIndex) {
  const libraryIndex = await getLibraryIndex();
  const backendResult = await deleteReviewRequest(libraryIndex, reviewIndex);

  // 로그인 필요할 때
  if (backendResult.state === LOGIN_REQUIRED) {
    const result = await sweetAlert(WARNING, "로그인 필요", "로그인창으로 갑니다.");
    if (result) location.href = "/user/login";
  }
  // 후기 삭제 권한 없음
  else if (backendResult.state === NOT_AUTHORIZATION) {
    const result = await sweetAlert(WARNING, "삭제권한이 없습니다.", "해당 후기를 작성한 유저가 아닙니다.");
    if (result) location.reload();
  }
  // 삭제 성공
  else if (backendResult.state === REQUEST_SUCCESS) {
    const result = await sweetAlert(SUCCESS, "후기 삭제 성공", "👌");
    if (result) location.reload();
  }
  // 예상치 못한 오류
  else {
    const result = await sweetAlert(ERROR, "후기 삭제 오류", "😥", `서버 메세지: ${backendResult.state}`);
    if (result) location.reload();
  }
}
// 수정버튼 눌렀을 때 호출해 줄 메서드
async function editReview(reviewIndex) {
  const libraryIndex = await getLibraryIndex();
  const requestResult = await getReviewRequest(libraryIndex, reviewIndex);
  // 로그인 필요
  if (requestResult.state === LOGIN_REQUIRED) {
    const result = await sweetAlert(WARNING, "로그인 필요", "로그인 해주세요");
    if (result) location.href = "/user/login";
    // 수정할 후기가 존재하지 않을 때
  } else if (requestResult.state === NO_REVIEW) {
    const result = await sweetAlert(WARNING, "후기가 존재하지 않습니다.", "삭제되거나 존재하지 않는 후기");
    if (result) location.reload();
    // 해당 후기를 작성한 유저가 아닐 때
  } else if (requestResult.state === NOT_AUTHORIZATION) {
    const result = await sweetAlert(
      WARNING,
      "후기 수정할 권한이 없습니다.",
      "해당 후기를 작성한 유저가 아닙니다."
    );
    if (result) location.reload();
    // 성공적으로 결과 받아왔을 때
  } else if (requestResult.reviewContent !== undefined) {
    // 평점 수정 알림창이 떴을 때 기존의 평점이 선택돼있도록 하는 html 코드
    let gradeSelectOption = `<optgroup label="평점">평점</optgroup>`;
    for (let gradeValue = 5; gradeValue >= 1; --gradeValue) {
      if (gradeValue !== requestResult.grade) gradeSelectOption += `<option value="${gradeValue}">`;
      if (gradeValue === requestResult.grade)
        gradeSelectOption += `<option selected="selected" value="${gradeValue}">`;
      for (let cnt = 0; cnt < gradeValue; cnt++) {
        gradeSelectOption += `⭐`;
      }
      gradeSelectOption += `</option>`;
    }
    // 평점 수정 알림창
    const { isConfirmed: isConfirmed, value: formValues } = await Swal.fire({
      title: "평점 수정",
      html:
        `<select id="swal-input1" class="swal2-select">${gradeSelectOption}` +
        `<textarea id="swal-input2" class="swal2-textarea" placeholder="2~100자 사이로 작성">${requestResult.reviewContent}</textarea>`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const review = document.getElementById("swal-input2").value;
        // 후기 유효성 검사(2~100자 사이가 아닐 때
        if (review.length < 2 || review.length > 100) {
          Swal.showValidationMessage(`후기는 2~100자 사이로 작성해야합니다. 현재 ${review.length}자 입니다.`);
        } else return [document.getElementById("swal-input1").value, review];
      },
    });
    // 수정 요청
    if (isConfirmed) {
      const grade = formValues[0];
      const review = formValues[1];
      const backendResult = await editReviewRequest(libraryIndex, reviewIndex, review, grade);
      // 수정 성공
      if (backendResult.state === REQUEST_SUCCESS) {
        const result = await sweetAlert(SUCCESS, "후기 수정 성공!", "🤩");
        if (result) location.reload();
      }
      // 로그인 필요
      else if (backendResult.state === LOGIN_REQUIRED) {
        const result = await sweetAlert(WARNING, "로그인 필요", "로그인 해주세요");
        if (result) location.href = "/user/login";
        // 권한이 없을 때
      } else if (backendResult.state === NOT_AUTHORIZATION) {
        const result = await sweetAlert(
          WARNING,
          "후기 수정 권한이 없습니다",
          "해당 후기를 작성한 유저가 아닙니다"
        );
        if (result) location.reload();
      }
      // 리뷰가 존재하지않거나 삭제됐을 때
      else if (backendResult.state === NO_REVIEW) {
        const result = await sweetAlert(
          WARNING,
          "존재하지 않는 후기입니다.",
          "삭제됐거나 존재하지않는 후기입니다."
        );
        if (result) location.reload();
      }
      // 예상치 못한 오류
      else {
        const result = await sweetAlert(
          ERROR,
          "후기 작성 실패",
          "예상치 못한 오류입니다.",
          `서버 메세지: ${backendResult.state}`
        );
        if (result) location.reload();
      }
    }
    // 수정 요청 취소(알림창 무시)
    else await sweetAlert(CHECK, "후기 수정 취소", "warning");
  }
}
// 최초 한번 호출해줄 함수
async function lifeCycle() {
  await detailLibrary();
  await getReview();
  // 무한 스크롤링으로 후기 정보 가져오기
  const libraryIndex = await getLibraryIndex();
  window.onscroll = async function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      const backendResult = await getDetailReview(libraryIndex, reviewPage++);
      // 성공적으로 후기 정보 불러왔을 때
      if (backendResult.state === undefined) {
        // 후기 불러오기
        for (let reviewData of backendResult) {
          await addReview(reviewData);
        }
        // 더 이상 불러올 후기가 없을 때의 상황이 아닐 때(예상치 못한 오류)
      } else if (backendResult.state !== NO_REVIEW) {
        const result = await sweetAlert(
          ERROR,
          "후기 불러오기 실패",
          "예상치 못한 오류입니다.",
          `서버 메세지: ${backendResult.state}`
        );
        if (result) location.reload();
      }
    }
  };
}

lifeCycle();
