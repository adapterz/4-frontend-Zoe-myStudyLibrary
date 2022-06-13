const BACKEND_URL="http://localhost:13414";const FRONT_URL="http://localhost:37866";const GET="GET";const POST="POST";const PATCH="PATCH";const DELETE="DELETE";const OK=200;const CREATED=201;const NO_CONTENT=204;const BAD_REQUEST=400;const UNAUTHORIZED=401;const FORBIDDEN=403;const NOT_FOUND=404;const CONFLICT=409;const INTERNAL_SERVER_ERROR=500;const FAIL_FETCH="fail_fetch";const REQUEST_SUCCESS="request_success";const LOGIN_REQUIRED="login_required";const LOGIN="login";const ALREADY_LOGIN="already_login";const LOGOUT="logout";const SIGN_UP="sign_up";const INVALID_BODY="invalid_body";const PW_MISMATCHED="pw_mismatched";const NEW_PW_CONFIRM_MISMATCHED="pw/pw_confirm_mismatched";const ONLY_IMAGE="only_jpg,jpeg,gjf,png(upper_5MB)_format_can_be_uploaded";const DUPLICATED_NICKNAME="duplicated_nickname";const NOT_EXIST="not_exist";const NO_COMMENT="no_comment";const FAVORITE="favorite +1";const CANCEL_FAVORITE="cancel_favorite";const NOT_AUTHORIZATION="not_authorization";const NO_REGISTERED_INFORMATION="no_registered_information";const INFO="info";const ERROR="error";const SUCCESS="success";const WARNING="warning";const QUESTION="question";const CHECK="check";async function getSignUpGuide(){try{const t={mode:"cors",credentials:"include"};const e=await fetch(`${BACKEND_URL}/user/sign-up/guide`,t);const n=e.status;if(n===OK){const t=await e.text();return t}else return await e.json()}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function signUpRequest(t,e,n,o,s,i,r){try{const c={mode:"cors",method:POST,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type, Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"},body:JSON.stringify({id:t,pw:e,confirmPw:n,name:o,nickname:s,phoneNumber:i,gender:r})};const a=await fetch(`${BACKEND_URL}/user/sign-up`,c);const l=await a.json();return l}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function dropOutRequest(){try{const t={mode:"cors",method:DELETE,credentials:"include",headers:{"Access-Control-Allow-Headers":" Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"}};const e=await fetch(`${BACKEND_URL}/user/drop-out`,t);if(e.status===NO_CONTENT)return{state:REQUEST_SUCCESS};const n=await e.json();return n}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function loginRequest(t,e){try{const n={mode:"cors",method:POST,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type"},body:JSON.stringify({id:t,pw:e})};const o=await fetch(`${BACKEND_URL}/user/login`,n);const s=await o.json();return s}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function logoutRequest(){try{const t={mode:"cors",method:POST,credentials:"include"};const e=await fetch(`${BACKEND_URL}/user/logout`,t);const n=await e.json();return n}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function getUserLibrary(){try{const t={mode:"cors",credentials:"include"};const e=await fetch(`${BACKEND_URL}/user/user-lib`,t);const n=await e.json();return n}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function reqRegisterUserLibrary(t){try{const e={mode:"cors",method:PATCH,credentials:"include"};const n=await fetch(`${BACKEND_URL}/user/user-lib?libraryIndex=${t}`,e);const o=n.status;if(o===OK)return{state:REQUEST_SUCCESS};const s=await n.json();return s}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function deleteUserLibrary(t){try{const e={mode:"cors",method:DELETE,credentials:"include"};const n=await fetch(`${BACKEND_URL}/user/user-lib?libraryIndex=${t}`,e);const o=await n.json();return o}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function editNicknameRequest(t){try{const e={mode:"cors",method:PATCH,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type, Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"},body:JSON.stringify({nickname:t})};const n=await fetch(`${BACKEND_URL}/user/profile/nickname`,e);const o=n.status;if(o===OK)return{state:REQUEST_SUCCESS};const s=await n.json();return s}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function editProfileImageRequest(t){try{const e={mode:"cors",method:PATCH,credentials:"include",body:t};const n=await fetch(`${BACKEND_URL}/user/profile/profileImage`,e);const o=n.status;if(o===OK)return{state:REQUEST_SUCCESS};const s=await n.json();return s}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function editContactRequest(t){try{const e={mode:"cors",method:PATCH,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type, Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"},body:JSON.stringify({phoneNumber:t})};const n=await fetch(`${BACKEND_URL}/user/new-contact`,e);const o=n.status;if(o===OK)return{state:REQUEST_SUCCESS};const s=await n.json();return s}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function editPwRequest(t,e,n){try{const o={mode:"cors",method:PATCH,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type, Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"},body:JSON.stringify({pw:t,newPw:e,confirmPw:n})};const s=await fetch(`${BACKEND_URL}/user/new-pw`,o);const i=s.status;if(i===OK)return{state:REQUEST_SUCCESS};const r=await s.json();return r}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function getUserInfo(){try{const t={mode:"cors",credentials:"include"};const e=await fetch(`${BACKEND_URL}/user/info`,t);const n=await e.json();return n}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function sweetAlert(t,e,n,o){let s=!1;if(t===INFO){const t=await Swal.fire({title:e,text:n,icon:"info",confirmButtonColor:"#ffa07a"});if(t.isConfirmed||t.isDismissed)s=!0;return s}else if(t===SUCCESS){const t=await Swal.fire({title:e,text:n,icon:"success",confirmButtonColor:"#ffa07a"});if(t.isConfirmed||t.isDismissed)s=!0;return s}else if(t===WARNING)if(o){const t=await Swal.fire({title:e,text:n,icon:"warning",confirmButtonColor:"#ffa07a",footer:o});if(t.isConfirmed||t.isDismissed)s=!0;return s}else{const t=await Swal.fire({title:e,text:n,icon:"warning",confirmButtonColor:"#ffa07a"});if(t.isConfirmed||t.isDismissed)s=!0;return s}else if(t===ERROR)if(o){const t=await Swal.fire({title:e,text:n,icon:"error",confirmButtonColor:"#ffa07a",footer:o});if(t.isConfirmed||t.isDismissed)s=!0;return s}else{const t=await Swal.fire({title:e,text:n,icon:"error",confirmButtonColor:"#ffa07a"});if(t.isConfirmed||t.isDismissed)s=!0;return s}else if(t===QUESTION){const t=await Swal.fire({title:e,text:n,icon:"question",confirmButtonColor:"#ffa07a"});if(t.isConfirmed||t.isDismissed)s=!0;return s}else if(t===CHECK){const t=Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:t=>{t.addEventListener("mouseenter",Swal.stopTimer);t.addEventListener("mouseleave",Swal.resumeTimer)}});t.fire({icon:n,title:e})}}async function checkLogin(){const t=await getUserInfo();if(t.state===LOGIN_REQUIRED){const t=await sweetAlert(WARNING,"로그인 필요","로그인이 필요한 기능입니다.");if(t){const t="/user/login";location.href=t}}}async function editPw(t,e,n){const o=await editPwRequest(t,e,n);if(o.state===REQUEST_SUCCESS){const t=await sweetAlert(SUCCESS,"비밀번호 수정 성공","홈페이지로 이동합니다");if(t){const t="/authorized";location.href=t}}else if(o.state===PW_MISMATCHED)await sweetAlert(WARNING,"비밀번호 수정 실패","현재 비밀번호가 일치하지 않습니다.");else if(o.state===NEW_PW_CONFIRM_MISMATCHED)await sweetAlert(WARNING,"비밀번호 수정 실패","새 비밀번호와 비밀번호 확인이 일치하지 않습니다");else if(o.state!==PW_MISMATCHED&&o.state!==NEW_PW_CONFIRM_MISMATCHED){const t=await sweetAlert(ERROR,"비밀번호 수정 실패","예상치 못한 오류입니다."`서버 메세지: ${o.state}`);if(t){const t="/";location.href=t}}}function checkValidation(t,e){if(e.value===t.value)t.setCustomValidity("");else t.setCustomValidity("새 비밀번호와 새 비밀번호확인이 일치하지 않습니다");t.reportValidity()}