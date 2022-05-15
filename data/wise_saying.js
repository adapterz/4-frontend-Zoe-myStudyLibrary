// 랜덤한 명언 정보 가져오기
async function getWiseSaying(){
  try {
    const options = {
      mode: "cors",
      credentials: "include",
    };
    const backendResponse = await fetch(`${BACKEND_URL}/wise-saying`, options);
    const getWiseSayingResult = await backendResponse.json();
    return getWiseSayingResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}