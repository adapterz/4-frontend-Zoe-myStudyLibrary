/*
 * 1. 전체도서관 정보
 * 2. 입력한 지역의 도서관 정보
 * 3. 특정 인덱스의 도서관 정보
 */
// 1. 전체 도서관 정보 불러오기
async function getEntireLibraryData() {
  try {
    const backendResponse = await fetch(`${BACKEND_URL}/library`, {
      mode: "cors",
      credentials: "include",
    });
    const entireLibraryData = await backendResponse.json();
    return entireLibraryData;
    /*
    console.log("##### 전체도서관 로그 찍기 ######");
    // 도서관 정보가 안왔을 때
    if (entireLibraryData.state !== undefined) console.log(entireLibraryData.state);
    else {
      // 전체 도서관 정보
      console.log("##### 성공시 첫번째 도서관 정보 ######");
      console.log(entireLibraryData[0].libraryName);
      console.log(entireLibraryData[0].libraryType);
      console.log(entireLibraryData[0].districts);
      console.log(entireLibraryData[0].address);
      console.log(entireLibraryData[0].closeDay);
      console.log(entireLibraryData[0].weekdayOperateTime);
      console.log(entireLibraryData[0].saturdayOperateTime);
      console.log(entireLibraryData[0].holidayOperateTime);
      console.log(entireLibraryData[0].libraryContact);
      console.log(entireLibraryData[0].averageGrade);
       */
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}

// 2. 입력한 지역에 따라 도서관 정보 불러오기
async function getLocalLibraryData(nameOfCity, districts) {
  try {
    const backendResponse = await fetch(
      `${BACKEND_URL}/library/search?nameOfCity=${nameOfCity}&districts=${districts}`,
      {
        mode: "cors",
        credentials: "include",
      }
    );
    const localLibraryData = await backendResponse.json();
    return localLibraryData;
    /*
    // 모델 실행 결과에 따른 분기처리
    if (localLibraryData.state !== undefined) {
      console.log(localLibraryData.state);
    } else {
      // 도서관 정보가 있을 때 도서관 정보 응답
      console.log("##### 지역 도서관 검색 : 첫번째 도서관 정보 ######");
      console.log(localLibraryData[0].libraryName);
      console.log(localLibraryData[0].libraryType);
      console.log(localLibraryData[0].districts);
      console.log(localLibraryData[0].address);
      console.log(localLibraryData[0].closeDay);
      console.log(localLibraryData[0].weekdayOperateTime);
      console.log(localLibraryData[0].saturdayOperateTime);
      console.log(localLibraryData[0].holidayOperateTime);
      console.log(localLibraryData[0].libraryContact);
      console.log(localLibraryData[0].averageGrade);
      }
     */
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}

// 3. 특정 도서관 정보 가져오기
async function getDetailLibraryData(libraryIndex) {
  try {
    const backendResponse = await fetch(`${BACKEND_URL}/library/librarys/${libraryIndex}`, {
      mode: "cors",
      credentials: "include",
    });

    const localLibraryData = await backendResponse.json();
    return localLibraryData;
    /*
    if (localLibraryData.state !== undefined) console.log(localLibraryData.state);
    else {
      console.log("##### 특정인덱스의 도서관 정보 ######");
      console.log(localLibraryData.libraryName);
      console.log(localLibraryData.libraryType);
      console.log(localLibraryData.districts);
      console.log(localLibraryData.address);
      console.log(localLibraryData.closeDay);
      console.log(localLibraryData.weekdayOperateTime);
      console.log(localLibraryData.saturdayOperateTime);
      console.log(localLibraryData.holidayOperateTime);
      console.log(localLibraryData.libraryContact);
      console.log(localLibraryData.countOfGrade);
      console.log(localLibraryData.averageGrade);
    }
     */
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}