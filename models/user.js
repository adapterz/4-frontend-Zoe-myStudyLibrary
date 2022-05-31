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
async function signUpRequest(_id, _pw, _confirmPw, _name, _nickname, _phoneNumber, _gender) {
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
async function dropOutRequest() {
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
    if (backendResponse.status === NO_CONTENT) return { state: REQUEST_SUCCESS };
    const dropOutResult = await backendResponse.json();
    return dropOutResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 2. 로그인/로그아웃
// 2-1. 로그인
async function loginRequest(_id, _pw) {
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
    const resultJson = await backendResponse.json();
    return resultJson;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}

// 2-2. 로그아웃
async function logoutRequest() {
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

// 3. 관심도서관 조회/등록/탈퇴
// 3-1. 관심도서관 조회
async function getUserLibrary() {
  try {
    const options = {
      mode: "cors",
      credentials: "include",
    };
    const backendResponse = await fetch(`${BACKEND_URL}/user/user-lib`, options);
    const getUserLibraryResult = await backendResponse.json();
    return getUserLibraryResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 3-2. 관심도서관 등록
async function reqRegisterUserLibrary(libraryIndex) {
  try {
    const options = {
      mode: "cors",
      method: PATCH,
      credentials: "include",
    };
    const backendResponse = await fetch(`${BACKEND_URL}/user/user-lib?libraryIndex=${libraryIndex}`, options);
    const status = backendResponse.status;
    // 구독 요청 성공
    if (status === OK) return { state: REQUEST_SUCCESS };
    // 구독 요청 실패했을 때
    const registerUserLibraryResult = await backendResponse.json();
    return registerUserLibraryResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 3-3. 관심도서관 삭제
async function deleteUserLibrary(libraryIndex) {
  try {
    const options = {
      mode: "cors",
      method: DELETE,
      credentials: "include",
    };
    const backendResponse = await fetch(`${BACKEND_URL}/user/user-lib?libraryIndex=${libraryIndex}`, options);
    const deleteUserLibraryResult = await backendResponse.json();
    return deleteUserLibraryResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}

// 4. 유저 정보 수정
// 4-1. 유저 프로필 - 닉네임 수정
async function editNicknameRequest(_nickname) {
  try {
    const options = {
      mode: "cors",
      method: PATCH,
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Headers": "Content-Type, Referrer-Policy",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: JSON.stringify({ nickname: _nickname }),
    };
    const backendResponse = await fetch(`${BACKEND_URL}/user/profile/nickname`, options);
    const status = backendResponse.status;
    if (status === OK) return { state: REQUEST_SUCCESS };

    const editUserNicknameResult = await backendResponse.json();
    return editUserNicknameResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// TODO 4-2. 유저 프로필 - 이미지 수정
async function editProfileImageRequest(_profileImage) {
  try {
    const imageFormData = new FormData();
    imageFormData.append("profileImage", _profileImage, _profileImage.name);
    console.log(imageFormData);
    const options = {
      mode: "cors",
      method: PATCH,
      credentials: "include",
      headers: {
        "Content-Type": "multipart/form-models; boundary=----MyBoundary",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: imageFormData,
    };
    const backendResponse = await fetch(`${BACKEND_URL}/user/profile/profileImage`, options);
    const status = backendResponse.status;
    // 연락처 수정 성공
    if (status === OK) return { state: REQUEST_SUCCESS };
    // 연락처 수정 실패
    const editProfileImageResult = await backendResponse.json();
    return editProfileImageResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 4-3. 연락처 수정
async function editContactRequest(contact) {
  try {
    const options = {
      mode: "cors",
      method: PATCH,
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Headers": "Content-Type, Referrer-Policy",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: JSON.stringify({ phoneNumber: contact }),
    };
    const backendResponse = await fetch(`${BACKEND_URL}/user/new-contact`, options);
    const status = backendResponse.status;
    // 연락처 수정 성공
    if (status === OK) return { state: REQUEST_SUCCESS };
    // 연락처 수정 실패
    const editContactResult = await backendResponse.json();
    return editContactResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}
// 4-4. 비밀번호 수정
async function editPwRequest(_pw, _newPw, _confirmPw) {
  try {
    const options = {
      mode: "cors",
      method: PATCH,
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Headers": "Content-Type, Referrer-Policy",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: JSON.stringify({ pw: _pw, newPw: _newPw, confirmPw: _confirmPw }),
    };
    const backendResponse = await fetch(`${BACKEND_URL}/user/new-pw`, options);
    const status = backendResponse.status;
    // 비밀번호 수정 성공
    if (status === OK) return { state: REQUEST_SUCCESS };
    // 비밀번호 수정 실패
    const editPwResult = await backendResponse.json();
    return editPwResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }
}

// 5. 유저 정보 가져오기
async function getUserInfo() {
  try {
    const options = {
      mode: "cors",
      credentials: "include",
    };
    const backendResponse = await fetch(`${BACKEND_URL}/user/info`, options);
    const getUserInfoResult = await backendResponse.json();
    return getUserInfoResult;
  } catch (err) {
    console.log(`FETCH ERROR: ${err}`);
    return { state: FAIL_FETCH };
  }

}
