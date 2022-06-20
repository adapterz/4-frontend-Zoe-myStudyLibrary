let isEntire = true; // 전체 도서관 정보 추가해줄 때 ture, 검색 결과 정보 추가해줄 때 false
let entirePage = 1; // 전체 도서관 정보 페이지
let scrollSearchPage = 1; // 검색한 도서관 정보 페이지
let scrollNameOfCity; // 시도 명
let scrollDistricts; // 시군구 명
// 최초 한번 전체 도서관 정보 가져오기
async function entireLibrary(libraryResult) {
  // 전체 1~10 번 인덱스 도서관 정보 컴포넌트 추가
  if (libraryResult.state === undefined) {
    for (let index = 0; index < 10; ++index) {
      await addLibrary(libraryResult[index]);
    }
  } else {
    const result = await sweetAlert(
      ERROR,
      "도서관 정보 불러오기 실패",
      "예상치 못한 오류입니다.",
      `서버 메세지: ${libraryResult.state}`
    );
    if (result) {
      const link = "/library";
      location.href = link;
    }
  }
}

// 최초 검색 요청 시 호출해줄 메서드
async function searchLibrary(nameOfCity, districts) {
  // 검색 결과
  const libraryResult = await getLocalLibraryData(nameOfCity, districts);
  // 페이지 도서관 목록 초기화
  const nav = document.getElementsByClassName("librarys__container")[0];
  nav.innerHTML = "";
  // 검색 결과가 없을 때
  if (libraryResult.state === NON_EXISTENT_LIBRARY) {
    const listElement = document.createElement("li");
    listElement.classList.add("library__list");
    document.getElementsByClassName("librarys__container")[0].appendChild(listElement);
    const nameElement = document.createElement("p");
    nameElement.classList.add("library__list--name");
    nameElement.textContent = `검색결과가 없습니다`;
    document.getElementsByClassName("library__list")[0].append(nameElement);
    // 도서관 정보가 있을 때
  } else if (libraryResult.state === undefined) {
    isEntire = false;
    scrollSearchPage = 1;
    scrollNameOfCity = nameOfCity;
    scrollDistricts = districts;
    for (let index = 0; index < 10; ++index) {
      if (libraryResult[index] !== undefined) {
        await addLibrary(libraryResult[index]);
      }
    }
  } else {
    const result = await sweetAlert(
      ERROR,
      "게시판 불러오기 실패",
      "예상치 못한 오류입니다.",
      `서버 메세지: ${libraryResult.state}`
    );
    if (result) {
      const link = "/board";
      location.href = link;
    }
  }
}
// 도서관 list 에 추가
async function addLibrary(library) {
  const {
    libraryIndex,
    libraryName,
    libraryType,
    closeDay,
    weekdayOperateTime,
    saturdayOperateTime,
    holidayOperateTime,
    address,
    libraryContact,
    averageGrade,
  } = library;
  // 도서관 리스트 생성
  const listElement = document.createElement("li");
  listElement.classList.add("library__list");
  document.getElementsByClassName("librarys__container")[0].appendChild(listElement);
  // 도서관 순서
  const index = document.getElementsByClassName("library__list").length - 1;
  // 도서관 리스트에 추가할 요소들
  // 하이퍼링크
  const hrefElement = document.createElement("a");
  hrefElement.classList.add("library__list--href");
  hrefElement.setAttribute("href", `/library/${libraryIndex}`);
  document.getElementsByClassName("library__list")[index].appendChild(hrefElement);
  // 도서관 이름
  const nameElement = document.createElement("p");
  nameElement.classList.add("library__list--name");
  nameElement.textContent = `${libraryName}`;
  // 도서관 종류
  const typeElement = document.createElement("p");
  typeElement.classList.add("library__list--component");
  typeElement.textContent = `종류 | ${libraryType}`;
  // 도서관 휴관일
  const closeDayElement = document.createElement("p");
  closeDayElement.classList.add("library__list--component");
  closeDayElement.textContent = `휴관일 | ${closeDay}`;
  // 주소
  const addressElement = document.createElement("p");
  addressElement.classList.add("library__list--component");
  addressElement.textContent = `주소 | ${address}`;
  // 연락처
  const libraryContactElement = document.createElement("p");
  libraryContactElement.classList.add("library__list--component");
  libraryContactElement.textContent = `연락처 | ${libraryContact}`;
  // 평점
  const gradeElement = document.createElement("p");
  gradeElement.classList.add("library__list--component");
  gradeElement.textContent = `🌟 ${averageGrade}`;

  document.getElementsByClassName("library__list--href")[index].append(nameElement);
  document.getElementsByClassName("library__list--href")[index].append(typeElement);
  document.getElementsByClassName("library__list--href")[index].append(closeDayElement);
  document.getElementsByClassName("library__list--href")[index].append(addressElement);
  document.getElementsByClassName("library__list--href")[index].append(libraryContactElement);
  document.getElementsByClassName("library__list--href")[index].append(gradeElement);
}
// 첫번째 select 에 따라 두번째 select 값 바뀌도록 하기
async function changeSubSelect(nameOfCity) {
  // dataArray ex) [[강원도,[강원도의 시들...],[경기도, [수원시, 용인시...]]...] -> 하나의 요소: [시/도,[시/군/구 목록]]
  const dataArray=await getAddressArray();
  const subOptionElement = document.getElementsByClassName("container__search--districts")[0];
  // data[0] - nameOfCity(시/도), data[1] - districts(시/군/구) 목록
  for (const data of dataArray) {
    // 첫번째 select 값과 일치할 때 두번째 select 태그 초기화
    if (data[0] === nameOfCity) {
      subOptionElement.innerHTML=`<optgroup label="시군구명">시군구명</optgroup>`;
      // 두번째 select 에 값넣기
      for (const tempDistricts of data[1]) {
        const optionElement = document.createElement("option");
        optionElement.value = tempDistricts;
        optionElement.innerHTML = tempDistricts;
        subOptionElement.appendChild(optionElement);
      }
    }
  }
}
// 최초 한번 호출
async function lifeCycle() {
  // 백엔드 서버에서 데이터 얻어오기
  const libraryResult = await getEntireLibraryData();
  // 페이지에 도서관 데이터 추가
  await entireLibrary(libraryResult);
  await changeSubSelect(document.getElementsByClassName("container__search--nameOfCity")[0].value);
  // 무한 스크롤링
  window.onscroll = async function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
      // 전체도서관 컴포넌트 추가
      if (isEntire === true) {
        const page = entirePage++;
        // 전체 도서관 정보
        if (libraryResult.state === undefined) {
          // 전체 도서관 목록 불러오기 (도서관 정보 3464개라 346 페이지까지)
          if (page < 347) {
            for (let index = page * 10; index < (page + 1) * 10; ++index) {
              if (libraryResult[index] !== undefined) {
                await addLibrary(libraryResult[index]);
              }
            }
          }
          // 전체 도서관 정보 불러오기 실패
        } else {
          const result = await sweetAlert(
            ERROR,
            "도서관 정보 불러오기 실패",
            "예상치 못한 오류입니다.",
            `서버 메세지: ${libraryResult.state}`
          );
          if (result) {
            const link = "/library";
            location.href = link;
          }
        }
        // 검색한 도서관 컴포넌트 추가
      } else {
        // 백엔드에서 얻어온 검색 결과
        const libraryResult = await getLocalLibraryData(scrollNameOfCity, scrollDistricts);
        // 성공적으로 데이터 가져왔을 때
        if (libraryResult.state !== NON_EXISTENT_LIBRARY || libraryResult[0] !== undefined) {
          const page = scrollSearchPage++;
          const libraryNum = libraryResult.length;
          if (page <= libraryNum / 10) {
            for (let index = page * 10; index < (page + 1) * 10; ++index) {
              if (libraryResult[index] !== undefined) {
                await addLibrary(libraryResult[index]);
              }
            }
          }
          // 데이터 불러오기 실패
        } else if (libraryResult.state !== NON_EXISTENT_LIBRARY) {
          const result = await sweetAlert(
            ERROR,
            "도서관 정보 불러오기 실패",
            "예상치 못한 오류입니다.",
            `서버 메세지: ${libraryResult.state}`
          );
        }
      }
    }
  };
}
lifeCycle();
