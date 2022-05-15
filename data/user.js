/*
 * 1. 회원가입/탈퇴
 * 2. 로그인/로그아웃
 * 3. 관심도서관 조회/등록/탈퇴
 * 4. 유저 정보 수정
 * 5. 유저 정보 가져오기
 *
 */
// 1. 회원가입/탈퇴
// 1-1. 회원가입 이용약관
async function getSignUpGuide() {
  try {
    const options = {
      mode: "cors",
      credentials: "include",
    };
    const backendResponse = await fetch(`${BACKEND_URL}/user/sign-up/guide`, options);
    const status = backendResponse.status;
    // 성공적으로 약관을 가져왔을 때
    if (status === OK) {
      const terms = await backendResponse.text();
      return terms;
      // 약관 가져오기 실패
    } else {
      return await backendResponse.json();
    }
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}

// 1-2. 회원가입
async function reqSignUp(_id, _pw, _confirmPw, _name, _nickname, _phoneNumber, _gender) {
  try {
    const options = {
      mode: "cors",
      method: POST,
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Headers": "Content-Type, Referrer-Policy",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: JSON.stringify({
        id: _id,
        pw: _pw,
        confirmPw: _confirmPw,
        name: _name,
        nickname: _nickname,
        phoneNumber: _phoneNumber,
        gender: _gender,
      }),
    };
    const backendResponse = await fetch(`${BACKEND_URL}/user/sign-up`, options);
    const signUpResult = await backendResponse.json();
    return signUpResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 1-3. 회원탈퇴
async function reqDropOut() {
  try {
    const options = {
      mode: "cors",
      method: DELETE,
      credentials: "include",
      headers: {
        "Access-Control-Allow-Headers": " Referrer-Policy",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    };
    const backendResponse = await fetch(`${BACKEND_URL}/user/drop-out`, options);
    const dropOutResult = await backendResponse.json();
    return dropOutResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 2. 로그인/로그아웃
// 2-1. 로그인
async function reqLogin(_id, _pw) {
  try {
    const options = {
      mode: "cors",
      method: POST,
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ id: _id, pw: _pw }),
    };
    const backendResponse = await fetch(`${BACKEND_URL}/user/login`, options);
    const loginResult = await backendResponse.json();
    return loginResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}

// 2-2. 로그아웃
async function reqLogout() {
  try {
    const options = {
      mode: "cors",
      method: POST,
      credentials: "include",
    };
    const backendResponse = await fetch(`${BACKEND_URL}/user/logout`, options);

    const logoutResult = await backendResponse.json();
    return logoutResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}