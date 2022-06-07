const BACKEND_URL="http://localhost:13414";const FRONT_URL="http://localhost:37866";const GET="GET";const POST="POST";const PATCH="PATCH";const DELETE="DELETE";const OK=200;const CREATED=201;const NO_CONTENT=204;const BAD_REQUEST=400;const UNAUTHORIZED=401;const FORBIDDEN=403;const NOT_FOUND=404;const CONFLICT=409;const INTERNAL_SERVER_ERROR=500;const FAIL_FETCH="fail_fetch";const REQUEST_SUCCESS="request_success";const LOGIN_REQUIRED="login_required";const LOGIN="login";const ALREADY_LOGIN="already_login";const LOGOUT="logout";const SIGN_UP="sign_up";const INVALID_BODY="invalid_body";const PW_MISMATCHED="pw_mismatched";const NEW_PW_CONFIRM_MISMATCHED="pw/pw_confirm_mismatched";const ONLY_IMAGE="only_jpg,jpeg,gjf,png(upper_5MB)_format_can_be_uploaded";const DUPLICATED_NICKNAME="duplicated_nickname";const NOT_EXIST="not_exist";const NO_COMMENT="no_comment";const FAVORITE="favorite +1";const CANCEL_FAVORITE="cancel_favorite";const NOT_AUTHORIZATION="not_authorization";const NO_REGISTERED_INFORMATION="no_registered_information";const INFO="info";const ERROR="error";const SUCCESS="success";const WARNING="warning";const QUESTION="question";const CHECK="check";async function getSignUpGuide(){try{const t={mode:"cors",credentials:"include"};const e=await fetch(`${BACKEND_URL}/user/sign-up/guide`,t);const o=e.status;if(o===OK){const t=await e.text();return t}else return await e.json()}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function signUpRequest(t,e,o,n,s,r,a){try{const c={mode:"cors",method:POST,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type, Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"},body:JSON.stringify({id:t,pw:e,confirmPw:o,name:n,nickname:s,phoneNumber:r,gender:a})};const i=await fetch(`${BACKEND_URL}/user/sign-up`,c);const d=await i.json();return d}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function dropOutRequest(){try{const t={mode:"cors",method:DELETE,credentials:"include",headers:{"Access-Control-Allow-Headers":" Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"}};const e=await fetch(`${BACKEND_URL}/user/drop-out`,t);if(e.status===NO_CONTENT)return{state:REQUEST_SUCCESS};const o=await e.json();return o}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function loginRequest(t,e){try{const o={mode:"cors",method:POST,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type"},body:JSON.stringify({id:t,pw:e})};const n=await fetch(`${BACKEND_URL}/user/login`,o);const s=await n.json();return s}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function logoutRequest(){try{const t={mode:"cors",method:POST,credentials:"include"};const e=await fetch(`${BACKEND_URL}/user/logout`,t);const o=await e.json();return o}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function getUserLibrary(){try{const t={mode:"cors",credentials:"include"};const e=await fetch(`${BACKEND_URL}/user/user-lib`,t);const o=await e.json();return o}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function reqRegisterUserLibrary(t){try{const e={mode:"cors",method:PATCH,credentials:"include"};const o=await fetch(`${BACKEND_URL}/user/user-lib?libraryIndex=${t}`,e);const n=o.status;if(n===OK)return{state:REQUEST_SUCCESS};const s=await o.json();return s}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function deleteUserLibrary(t){try{const e={mode:"cors",method:DELETE,credentials:"include"};const o=await fetch(`${BACKEND_URL}/user/user-lib?libraryIndex=${t}`,e);const n=await o.json();return n}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function editNicknameRequest(t){try{const e={mode:"cors",method:PATCH,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type, Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"},body:JSON.stringify({nickname:t})};const o=await fetch(`${BACKEND_URL}/user/profile/nickname`,e);const n=o.status;if(n===OK)return{state:REQUEST_SUCCESS};const s=await o.json();return s}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function editProfileImageRequest(t){try{const e={mode:"cors",method:PATCH,credentials:"include",body:t};const o=await fetch(`${BACKEND_URL}/user/profile/profileImage`,e);const n=o.status;if(n===OK)return{state:REQUEST_SUCCESS};const s=await o.json();return s}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function editContactRequest(t){try{const e={mode:"cors",method:PATCH,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type, Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"},body:JSON.stringify({phoneNumber:t})};const o=await fetch(`${BACKEND_URL}/user/new-contact`,e);const n=o.status;if(n===OK)return{state:REQUEST_SUCCESS};const s=await o.json();return s}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function editPwRequest(t,e,o){try{const n={mode:"cors",method:PATCH,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type, Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"},body:JSON.stringify({pw:t,newPw:e,confirmPw:o})};const s=await fetch(`${BACKEND_URL}/user/new-pw`,n);const r=s.status;if(r===OK)return{state:REQUEST_SUCCESS};const a=await s.json();return a}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function getUserInfo(){try{const t={mode:"cors",credentials:"include"};const e=await fetch(`${BACKEND_URL}/user/info`,t);const o=await e.json();return o}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function getRecentBoard(){try{const t={mode:"cors",credentials:"include"};const e=await fetch(`${BACKEND_URL}/board/get`,t);const o=await e.json();if(e.status===OK)return o[0];return o}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function getEntireBoard(t){try{let e;const o={mode:"cors",credentials:"include"};if(void 0===t)e=await fetch(`${BACKEND_URL}/board/get/free-bulletin`,o);else e=await fetch(`${BACKEND_URL}/board/get/free-bulletin?page=${t}`,o);const n=await e.json();return n}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function getDetailBoard(t){try{const e={mode:"cors",credentials:"include"};const o=await fetch(`${BACKEND_URL}/board/get/free-bulletin/${t}`,e);const n=await o.json();if(o.status===OK)n.state=REQUEST_SUCCESS;return n}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function writePostRequest(t,e,o){try{const n=[];const s=o.split("#");s.shift();for(let t of s){const e={content:t};n.push(e)}const r={mode:"cors",method:POST,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type, Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"},body:JSON.stringify({category:"자유게시판",postTitle:t,postContent:e,tags:n})};const a=await fetch(`${BACKEND_URL}/board/write`,r);const c=a.status;if(c===CREATED)return{state:REQUEST_SUCCESS};const i=await a.json();return i}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function getPostRequest(t){try{const e={mode:"cors",method:GET,credentials:"include"};const o=await fetch(`${BACKEND_URL}/board/write?boardIndex=${t}`,e);const n=await o.json();if(o.status===OK)n.state=REQUEST_SUCCESS;return n}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function editPostRequest(t,e,o,n){try{const s=[];const r=n.split("#");r.shift();for(let t of r){const e={content:t};s.push(e)}const a={mode:"cors",method:PATCH,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type, Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"},body:JSON.stringify({category:"자유게시판",postTitle:e,postContent:o,tags:s})};const c=await fetch(`${BACKEND_URL}/board/edit?boardIndex=${t}`,a);if(c.status===OK)return{state:REQUEST_SUCCESS};const i=c.json();return i}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function deletePostRequest(t){try{const e={mode:"cors",method:DELETE,credentials:"include"};const o=await fetch(`${BACKEND_URL}/board/delete?boardIndex=${t}`,e);const n=o.status;if(n===NO_CONTENT)return{state:REQUEST_SUCCESS};const s=await o.json();return s}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function favoritePostRequest(t){try{const e={mode:"cors",method:PATCH,credentials:"include"};const o=await fetch(`${BACKEND_URL}/board/like?boardIndex=${t}`,e);const n=o.json();return n}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function getSearchBoard(t,e,o){try{let n;const s={mode:"cors",method:GET,credentials:"include"};if(void 0===o)n=await fetch(`${BACKEND_URL}/board/search/free-bulletin?searchOption=${t}&searchContent=${e}`,s);else n=await fetch(`${BACKEND_URL}/board/search/free-bulletin?searchOption=${t}&searchContent=${e}&page=${o}`,s);const r=n.json();return r}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function userPostRequest(t){try{let e;const o={mode:"cors",method:GET,credentials:"include"};if(void 0===t)e=await fetch(`${BACKEND_URL}/board/user`,o);else e=await fetch(`${BACKEND_URL}/board/user?page=${t}`,o);const n=e.json();return n}catch(t){console.log(`FETCH ERROR: ${t}`);return{state:FAIL_FETCH}}}async function sweetAlert(t,e,o,n){let s=!1;if(t===INFO){const t=await Swal.fire({title:e,text:o,icon:"info",confirmButtonColor:"#ffa07a"});if(t.isConfirmed||t.isDismissed)s=!0;return s}else if(t===SUCCESS){const t=await Swal.fire({title:e,text:o,icon:"success",confirmButtonColor:"#ffa07a"});if(t.isConfirmed||t.isDismissed)s=!0;return s}else if(t===WARNING)if(n){const t=await Swal.fire({title:e,text:o,icon:"warning",confirmButtonColor:"#ffa07a",footer:n});if(t.isConfirmed||t.isDismissed)s=!0;return s}else{const t=await Swal.fire({title:e,text:o,icon:"warning",confirmButtonColor:"#ffa07a"});if(t.isConfirmed||t.isDismissed)s=!0;return s}else if(t===ERROR)if(n){const t=await Swal.fire({title:e,text:o,icon:"error",confirmButtonColor:"#ffa07a",footer:n});if(t.isConfirmed||t.isDismissed)s=!0;return s}else{const t=await Swal.fire({title:e,text:o,icon:"error",confirmButtonColor:"#ffa07a"});if(t.isConfirmed||t.isDismissed)s=!0;return s}else if(t===QUESTION){const t=await Swal.fire({title:e,text:o,icon:"question",confirmButtonColor:"#ffa07a"});if(t.isConfirmed||t.isDismissed)s=!0;return s}else if(t===CHECK){const t=Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:t=>{t.addEventListener("mouseenter",Swal.stopTimer);t.addEventListener("mouseleave",Swal.resumeTimer)}});t.fire({icon:o,title:e})}}let t=!0;let e=2;let o=2;let n;let s;async function entireBoard(t){const e=await getEntireBoard(t);if((void 0!==t||1===t)&&e.state===NOT_EXIST){const t=document.createElement("li");t.classList.add("freeBoard__board--list");document.getElementsByClassName("freeBoard__board")[0].appendChild(t);const e=document.createElement("p");e.classList.add("freeBoard__board--title");e.textContent="검색결과가 없습니다";document.getElementsByClassName("freeBoard__board--list")[0].appendChild(e)}else if(void 0!==e[0])for(let t in e)await addPost(e[t].postTitle,e[t].nickname,e[t].viewCount,e[t].favoriteCount,e[t].createDate,e[t].boardIndex);else{const t=await sweetAlert(ERROR,"게시판 불러오기 실패","예상치 못한 오류입니다."`서버 메세지: ${e.state}`);if(t){const t="/board";location.href=t}}}async function searchBoard(e,r,a){const c=await getSearchBoard(e,r,a);const i=document.getElementsByClassName("freeBoard__board")[0];i.innerHTML="";if((void 0!==a||1===a)&&c.state===NOT_EXIST){const t=document.createElement("li");t.classList.add("freeBoard__board--list");document.getElementsByClassName("freeBoard__board")[0].appendChild(t);const e=document.createElement("p");e.classList.add("freeBoard__board--title");e.textContent="검색결과가 없습니다";document.getElementsByClassName("freeBoard__board--list")[0].appendChild(e)}else if(void 0!==c[0]){t=!1;o=2;n=e;s=r;for(let t in c)await addPost(c[t].postTitle,c[t].nickname,c[t].viewCount,c[t].favoriteCount,c[t].createDate,c[t].boardIndex)}else{const t=await sweetAlert(ERROR,"게시판 불러오기 실패","예상치 못한 오류입니다."`서버 메세지: ${c.state}`);if(t){const t="/board";location.href=t}}}async function addPost(t,e,o,n,s,r){const a=document.createElement("li");a.classList.add("freeBoard__board--list");document.getElementsByClassName("freeBoard__board")[0].appendChild(a);const c=document.getElementsByClassName("freeBoard__board--list").length-1;const i=document.createElement("a");i.classList.add("freeBoard__board--href");i.setAttribute("href",`/board/${r}`);document.getElementsByClassName("freeBoard__board--list")[c].appendChild(i);const d=document.createElement("p");d.classList.add("freeBoard__board--title");d.textContent=`${t}`;const l=document.createElement("p");l.classList.add("freeBoard__board--nickname");l.textContent=`${e}`;const f=document.createElement("p");f.classList.add("freeBoard__board--viewCount");f.innerHTML=`\n              <img className="freeBoard__board--img" width="15px",height="15px" src="/views/img/view.png" alt="조회수 아이콘" /> ${o}`;const u=document.createElement("p");u.classList.add("freeBoard__board--favoriteCount");u.innerHTML=`\n              <img className="freeBoard__board--img" width="15px",height="15px" src="/views/img/love.png" alt="조회수 아이콘" /> ${n}`;const m=document.createElement("p");m.classList.add("freeBoard__board--createDate");m.textContent=`${s}`;document.getElementsByClassName("freeBoard__board--href")[c].append(d);document.getElementsByClassName("freeBoard__board--href")[c].append(l);document.getElementsByClassName("freeBoard__board--href")[c].append(f);document.getElementsByClassName("freeBoard__board--href")[c].append(u);document.getElementsByClassName("freeBoard__board--href")[c].append(m)}async function checkLogin(){const t=await getUserInfo();if(t.state===LOGIN_REQUIRED){const t=await sweetAlert(WARNING,"로그인 필요","로그인이 필요한 기능입니다.");if(t){const t="/user/login";location.href=t}}else{const t="/board/write";location.href=t}}async function lifeCycle(){await entireBoard();window.onscroll=async function(){if(window.innerHeight+window.scrollY>=document.body.offsetHeight-2){let r;if(!0===t){r=await getEntireBoard(e++);if(void 0!==r[0])for(let t in r)await addPost(r[t].postTitle,r[t].nickname,r[t].viewCount,r[t].favoriteCount,r[t].createDate,r[t].boardIndex);else if(r.state!==NOT_EXIST){const t=await sweetAlert(ERROR,"게시판 불러오기 실패","예상치 못한 오류입니다."`서버 메세지: ${r.state}`)}}else{r=await getSearchBoard(n,s,o++);if(void 0!==r[0])for(let t in r)await addPost(r[t].postTitle,r[t].nickname,r[t].viewCount,r[t].favoriteCount,r[t].createDate,r[t].boardIndex);else if(r.state!==NOT_EXIST){const t=await sweetAlert(ERROR,"게시판 불러오기 실패","예상치 못한 오류입니다."`서버 메세지: ${r.state}`)}}}}}lifeCycle();