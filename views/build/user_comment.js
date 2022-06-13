const BACKEND_URL="http://localhost:13414";const FRONT_URL="http://localhost:37866";const GET="GET";const POST="POST";const PATCH="PATCH";const DELETE="DELETE";const OK=200;const CREATED=201;const NO_CONTENT=204;const BAD_REQUEST=400;const UNAUTHORIZED=401;const FORBIDDEN=403;const NOT_FOUND=404;const CONFLICT=409;const INTERNAL_SERVER_ERROR=500;const FAIL_FETCH="fail_fetch";const REQUEST_SUCCESS="request_success";const LOGIN_REQUIRED="login_required";const LOGIN="login";const ALREADY_LOGIN="already_login";const LOGOUT="logout";const SIGN_UP="sign_up";const INVALID_BODY="invalid_body";const PW_MISMATCHED="pw_mismatched";const NEW_PW_CONFIRM_MISMATCHED="pw/pw_confirm_mismatched";const ONLY_IMAGE="only_jpg,jpeg,gjf,png(upper_5MB)_format_can_be_uploaded";const DUPLICATED_NICKNAME="duplicated_nickname";const NOT_EXIST="not_exist";const NO_COMMENT="no_comment";const FAVORITE="favorite +1";const CANCEL_FAVORITE="cancel_favorite";const NOT_AUTHORIZATION="not_authorization";const NO_REGISTERED_INFORMATION="no_registered_information";const INFO="info";const ERROR="error";const SUCCESS="success";const WARNING="warning";const QUESTION="question";const CHECK="check";async function getSignUpGuide(){try{const e={mode:"cors",credentials:"include"};const t=await fetch(`${BACKEND_URL}/user/sign-up/guide`,e);const n=t.status;if(n===OK){const e=await t.text();return e}else return await t.json()}catch(e){console.log(`FETCH ERROR: ${e}`);return{state:FAIL_FETCH}}}async function signUpRequest(e,t,n,o,s,c,r){try{const i={mode:"cors",method:POST,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type, Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"},body:JSON.stringify({id:e,pw:t,confirmPw:n,name:o,nickname:s,phoneNumber:c,gender:r})};const a=await fetch(`${BACKEND_URL}/user/sign-up`,i);const l=await a.json();return l}catch(e){console.log(`FETCH ERROR: ${e}`);return{state:FAIL_FETCH}}}async function dropOutRequest(){try{const e={mode:"cors",method:DELETE,credentials:"include",headers:{"Access-Control-Allow-Headers":" Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"}};const t=await fetch(`${BACKEND_URL}/user/drop-out`,e);if(t.status===NO_CONTENT)return{state:REQUEST_SUCCESS};const n=await t.json();return n}catch(e){console.log(`FETCH ERROR: ${e}`);return{state:FAIL_FETCH}}}async function loginRequest(e,t){try{const n={mode:"cors",method:POST,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type"},body:JSON.stringify({id:e,pw:t})};const o=await fetch(`${BACKEND_URL}/user/login`,n);const s=await o.json();return s}catch(e){console.log(`FETCH ERROR: ${e}`);return{state:FAIL_FETCH}}}async function logoutRequest(){try{const e={mode:"cors",method:POST,credentials:"include"};const t=await fetch(`${BACKEND_URL}/user/logout`,e);const n=await t.json();return n}catch(e){console.log(`FETCH ERROR: ${e}`);return{state:FAIL_FETCH}}}async function getUserLibrary(){try{const e={mode:"cors",credentials:"include"};const t=await fetch(`${BACKEND_URL}/user/user-lib`,e);const n=await t.json();return n}catch(e){console.log(`FETCH ERROR: ${e}`);return{state:FAIL_FETCH}}}async function reqRegisterUserLibrary(e){try{const t={mode:"cors",method:PATCH,credentials:"include"};const n=await fetch(`${BACKEND_URL}/user/user-lib?libraryIndex=${e}`,t);const o=n.status;if(o===OK)return{state:REQUEST_SUCCESS};const s=await n.json();return s}catch(e){console.log(`FETCH ERROR: ${e}`);return{state:FAIL_FETCH}}}async function deleteUserLibrary(e){try{const t={mode:"cors",method:DELETE,credentials:"include"};const n=await fetch(`${BACKEND_URL}/user/user-lib?libraryIndex=${e}`,t);const o=await n.json();return o}catch(e){console.log(`FETCH ERROR: ${e}`);return{state:FAIL_FETCH}}}async function editNicknameRequest(e){try{const t={mode:"cors",method:PATCH,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type, Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"},body:JSON.stringify({nickname:e})};const n=await fetch(`${BACKEND_URL}/user/profile/nickname`,t);const o=n.status;if(o===OK)return{state:REQUEST_SUCCESS};const s=await n.json();return s}catch(e){console.log(`FETCH ERROR: ${e}`);return{state:FAIL_FETCH}}}async function editProfileImageRequest(e){try{const t={mode:"cors",method:PATCH,credentials:"include",body:e};const n=await fetch(`${BACKEND_URL}/user/profile/profileImage`,t);const o=n.status;if(o===OK)return{state:REQUEST_SUCCESS};const s=await n.json();return s}catch(e){console.log(`FETCH ERROR: ${e}`);return{state:FAIL_FETCH}}}async function editContactRequest(e){try{const t={mode:"cors",method:PATCH,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type, Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"},body:JSON.stringify({phoneNumber:e})};const n=await fetch(`${BACKEND_URL}/user/new-contact`,t);const o=n.status;if(o===OK)return{state:REQUEST_SUCCESS};const s=await n.json();return s}catch(e){console.log(`FETCH ERROR: ${e}`);return{state:FAIL_FETCH}}}async function editPwRequest(e,t,n){try{const o={mode:"cors",method:PATCH,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type, Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"},body:JSON.stringify({pw:e,newPw:t,confirmPw:n})};const s=await fetch(`${BACKEND_URL}/user/new-pw`,o);const c=s.status;if(c===OK)return{state:REQUEST_SUCCESS};const r=await s.json();return r}catch(e){console.log(`FETCH ERROR: ${e}`);return{state:FAIL_FETCH}}}async function getUserInfo(){try{const e={mode:"cors",credentials:"include"};const t=await fetch(`${BACKEND_URL}/user/info`,e);const n=await t.json();return n}catch(e){console.log(`FETCH ERROR: ${e}`);return{state:FAIL_FETCH}}}async function writeCommentRequest(e,t,n){try{let o;const s={mode:"cors",method:POST,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type, Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"},body:JSON.stringify({content:t})};if(void 0===n)o=await fetch(`${BACKEND_URL}/comment/post?boardIndex=${e}`,s);else o=await fetch(`${BACKEND_URL}/comment/post?boardIndex=${e}&parentIndex=${n}`,s);const c=o.status;if(c===CREATED)return{state:REQUEST_SUCCESS};const r=await o.json();return r}catch(e){console.log(`FETCH ERROR: ${e}`);return{state:FAIL_FETCH}}}async function getDetailComment(e,t){try{const n={mode:"cors",credentials:"include"};if(void 0===t){const t=await fetch(`${BACKEND_URL}/comment?boardIndex=${e}`,n);const o=await t.json();return o}const o=await fetch(`${BACKEND_URL}/comment?boardIndex=${e}&page=${t}`,n);const s=await o.json();return s}catch(e){console.log(`FETCH ERROR: ${e}`);return{state:FAIL_FETCH}}}async function getComment(e,t){try{const n={mode:"cors",method:GET,credentials:"include"};const o=await fetch(`${BACKEND_URL}/comment/edit?boardIndex=${e}&commentIndex=${t}`,n);const s=await o.json();return s}catch(e){console.log(`FETCH ERROR: ${e}`);return{state:FAIL_FETCH}}}async function editCommentRequest(e,t,n){try{const o={mode:"cors",method:PATCH,credentials:"include",headers:{"Content-Type":"application/json;charset=utf-8","Access-Control-Allow-Headers":"Content-Type, Referrer-Policy","Referrer-Policy":"strict-origin-when-cross-origin"},body:JSON.stringify({content:n})};const s=await fetch(`${BACKEND_URL}/comment/edit?boardIndex=${e}&commentIndex=${t}`,o);const c=s.status;if(c===OK)return{state:REQUEST_SUCCESS};const r=await s.json();return r}catch(e){console.log(`FETCH ERROR: ${e}`);return{state:FAIL_FETCH}}}async function deleteCommentRequest(e,t){const n={mode:"cors",method:DELETE,credentials:"include"};const o=await fetch(`${BACKEND_URL}/comment/delete?boardIndex=${e}&commentIndex=${t}`,n);const s=o.status;if(s===NO_CONTENT)return{state:REQUEST_SUCCESS};const c=await o.json();return c}async function userCommentRequest(e){try{const t={mode:"cors",method:GET,credentials:"include"};if(void 0===e){const e=await fetch(`${BACKEND_URL}/comment/user`,t);const n=await e.json();return n}const n=await fetch(`${BACKEND_URL}/comment/user?page=${e}`,t);const o=await n.json();return o}catch(e){console.log(`FETCH ERROR: ${e}`);return{state:FAIL_FETCH}}}async function sweetAlert(e,t,n,o){let s=!1;if(e===INFO){const e=await Swal.fire({title:t,text:n,icon:"info",confirmButtonColor:"#ffa07a"});if(e.isConfirmed||e.isDismissed)s=!0;return s}else if(e===SUCCESS){const e=await Swal.fire({title:t,text:n,icon:"success",confirmButtonColor:"#ffa07a"});if(e.isConfirmed||e.isDismissed)s=!0;return s}else if(e===WARNING)if(o){const e=await Swal.fire({title:t,text:n,icon:"warning",confirmButtonColor:"#ffa07a",footer:o});if(e.isConfirmed||e.isDismissed)s=!0;return s}else{const e=await Swal.fire({title:t,text:n,icon:"warning",confirmButtonColor:"#ffa07a"});if(e.isConfirmed||e.isDismissed)s=!0;return s}else if(e===ERROR)if(o){const e=await Swal.fire({title:t,text:n,icon:"error",confirmButtonColor:"#ffa07a",footer:o});if(e.isConfirmed||e.isDismissed)s=!0;return s}else{const e=await Swal.fire({title:t,text:n,icon:"error",confirmButtonColor:"#ffa07a"});if(e.isConfirmed||e.isDismissed)s=!0;return s}else if(e===QUESTION){const e=await Swal.fire({title:t,text:n,icon:"question",confirmButtonColor:"#ffa07a"});if(e.isConfirmed||e.isDismissed)s=!0;return s}else if(e===CHECK){const e=Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer);e.addEventListener("mouseleave",Swal.resumeTimer)}});e.fire({icon:n,title:t})}}let e=2;async function userComment(){const e=await userCommentRequest();if(e.state===LOGIN_REQUIRED){const e=await sweetAlert(WARNING,"로그인 필요","로그인이 필요한 기능입니다.");if(e){const e="/user/login";location.href=e}}else if(e.state===NO_REGISTERED_INFORMATION){const e=document.createElement("li");e.classList.add("userResource--comment__list");document.getElementsByClassName("userResource__comment--container")[0].appendChild(e);const t=document.createElement("p");t.classList.add("userResource__comment--title");t.textContent="작성한 댓글이 없습니다.";document.getElementsByClassName("userResource--comment__list")[0].appendChild(t)}else if(void 0!==e[0])for(let t of e){const{commentIndex:e,boardIndex:n,postTitle:o,commentContent:s,createDate:c}=t;await addComment(o,s,c,n,e)}else{const t=await sweetAlert(ERROR,"작성한 댓글 불러오기 실패","예상치 못한 오류입니다."`서버 메세지: ${e.state}`);if(t)location.href="/"}}async function addComment(e,t,n,o,s){const c=document.createElement("li");c.classList.add("userResource__comment--list");document.getElementsByClassName("userResource__comment--container")[0].appendChild(c);const r=document.getElementsByClassName("userResource__comment--list").length-1;const i=document.createElement("a");i.classList.add("userResource__comment--href");i.setAttribute("href",`/board/${o}`);document.getElementsByClassName("userResource__comment--list")[r].appendChild(i);const a=document.createElement("p");a.classList.add("userResource__comment--title");a.textContent=`${e}`;const l=document.createElement("p");l.classList.add("userResource__comment--content");l.textContent=`${t}`;const u=document.createElement("p");u.classList.add("userResource__comment--createDate");u.textContent=`${n}`;const d=document.createElement("button");d.classList.add("button__userResource--delete");d.setAttribute("boardIndex",o);d.setAttribute("commentIndex",s);d.setAttribute("onclick","deleteComment(this.getAttribute('boardIndex'),this.getAttribute('commentIndex'))");d.innerHTML="삭제";document.getElementsByClassName("userResource__comment--href")[r].append(a);document.getElementsByClassName("userResource__comment--href")[r].append(l);document.getElementsByClassName("userResource__comment--href")[r].append(u);document.getElementsByClassName("userResource__comment--list")[r].append(d)}async function deleteComment(e,t){const n=await deleteCommentRequest(e,t);if(n.state===LOGIN_REQUIRED){const e=await sweetAlert(WARNING,"로그인 필요","로그인창으로 갑니다.");if(e)location.href="/user/login"}else if(n.state===NOT_EXIST){const e=await sweetAlert(WARNING,"존재하지 않는 게시글입니다.","삭제되거나 존재하지 않는 게시글입니다.");if(e)location.href="/comment/user"}else if(n.state===NO_COMMENT){const e=await sweetAlert(WARNING,"존재하지 않는 댓글입니다.","삭제되거나 존재하지 않는 댓글입니다.");if(e)location.href="/comment/user"}else if(n.state===NOT_AUTHORIZATION){const e=await sweetAlert(WARNING,"권한이 없습니다.","해당 댓글을 작성한 유저가 아닙니다.");if(e)location.href="/"}else if(n.state===REQUEST_SUCCESS){const e=await sweetAlert(SUCCESS,"댓글 삭제 성공","🤗");if(e)location.reload()}else{const e=await sweetAlert(ERROR,"게시물 삭제 오류","게시글 목록으로 돌아갑니다.",`서버 메세지: ${n.state}`);if(e)location.href="/board"}}async function lifeCycle(){await userComment();window.onscroll=async function(){if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1){const t=await userCommentRequest(e++);if(t.state===LOGIN_REQUIRED){const e=await sweetAlert(WARNING,"로그인 필요","로그인이 필요한 기능입니다.");if(e){const e="/user/login";location.href=e}}else if(void 0!==t[0])for(let e of t){const{commentIndex:t,boardIndex:n,postTitle:o,commentContent:s,createDate:c}=e;await addComment(o,s,c,n,t)}else if(t.state!==NO_REGISTERED_INFORMATION){const e=await sweetAlert(ERROR,"작성한 글 불러오기 실패","예상치 못한 오류입니다."`서버 메세지: ${t.state}`);if(e)location.href="/"}}}}lifeCycle();