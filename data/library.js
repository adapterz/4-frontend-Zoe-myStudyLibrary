/*
 * 1. 전체도서관 정보
 * 2. 입력한 지역의 도서관 정보
 * 3. 특정 인덱스의 도서관 정보
 */
// 1. 전체 도서관 정보 불러오기
async function getEntireLibraryData() {
  try {
    const options = {
      mode: "cors",
      credentials: "include",
    };
    const backendResponse = await fetch(`${BACKEND_URL}/library`, options);
    const entireLibraryData = await backendResponse.json();
    return entireLibraryData;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 2. 입력한 지역에 따라 도서관 정보 불러오기
async function getLocalLibraryData(nameOfCity, districts) {
  try {
    const options = {
      mode: "cors",
      credentials: "include",
    };
    const backendResponse = await fetch(
      `${BACKEND_URL}/library/search?nameOfCity=${nameOfCity}&districts=${districts}`,
      options
    );
    const localLibraryData = await backendResponse.json();
    return localLibraryData;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 3. 특정 도서관 정보 가져오기
async function getDetailLibraryData(libraryIndex) {
  try {
    const options = {
      mode: "cors",
      credentials: "include",
    };
    const backendResponse = await fetch(`${BACKEND_URL}/library/librarys/${libraryIndex}`, options);

    const localLibraryData = await backendResponse.json();
    return localLibraryData;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}