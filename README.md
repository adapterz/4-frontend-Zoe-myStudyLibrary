# 4-frontend-Zoe-myStudyLibrary

## :books: 내 주변의 도서관 찾는 사이트 :books:

프로젝트 명: myStudyLibrary

작성자: 김예지

작성연월: 2022-06

## :closed_book: 프로젝트 설명

사용자의 지역을 입력하면 그 지역의 도서관이 검색되는 복지 사이트 입니다.

각 개별 도서관에 평점, 후기를 남길 수 있고 사이트 사용자들끼리 커뮤니티 글을 공유할 수 있습니다.

---

## :orange_book: 프로젝트 기획

ovenapp.io 툴 이용했습니다.

1. :clipboard: [기획](https://ovenapp.io/view/sM4TbEvWMLijyHLw5oZIhUubP99mgGUD/gHdLH)
2. 왼쪽 하단의 '메모 표시'를 누르면 각 페이지와 기능에 대한 설명을 볼 수 있습니다.
3. 화살표를 누르거나 '페이지 목록'을 누르면 다른 페이지로 넘어갈 수 있습니다.
4. '링크 영역 표시'를 누르면 누를 수 있는 영역을 확인할 수 있습니다.
* 해당 프로젝트를 진행하면서 초반 기획과 달라진 부분들이 꽤 있으니 참고바랍니다.

:clipboard: [사이트 링크](https://mystudylibrary.pe.kr)
:clipboard: [백엔드 서버 깃허브](https://github.com/Zoe0631/4-backend-Zoe-myStudyLibrary)



## :pushpin: 폴더 구조


```bash
├── controllers
│   ├── board.js
│   ├── library.js
│   └── user.js
├── customs
│   ├── buildJs.js # js 파일 빌드
│   ├── constant.js
│   └── dateTime.js
├── models
│   ├── board.js
│   ├── comment.js
│   ├── library.js
│   ├── review.js
│   ├── user.js
│   └── wise_saying.js
├── routes
│   ├── board.js
│   ├── library.js
│   └── user.js
├── views
│   ├── build # 직접 빌드해서 사용하는 디렉토리로 github에는 업로드 하지 않는 디렉토리
│   ├── css
│   │   ├── common.css
│   │   ├── drop_out.css
│   │   ├── edit_contact.css
│   │   ├── edit_nickname.css
│   │   ├── edit_profileImage.css
│   │   ├── edit_pw.css
│   │   ├── free_board.css
│   │   ├── free_board_detail.css
│   │   ├── free_board.write.css
│   │   ├── home.css
│   │   ├── library.css
│   │   ├── library_detail.css
│   │   ├── login.css
│   │   ├── reset.css
│   │   ├── sign_up.css
│   │   ├── sign_up_guide.css
│   │   ├── terms.css
│   │   └── user_info.css
│   ├── html
│   │   ├── drop_out.html
│   │   ├── edit_contact.html
│   │   ├── edit_nickname.html
│   │   ├── edit_profileImage.html
│   │   ├── edit_pw.html
│   │   ├── free_board.html
│   │   ├── free_board_detail.html
│   │   ├── free_board.write.html
│   │   ├── home_login.html
│   │   ├── home_not_login.html
│   │   ├── library.html
│   │   ├── library_detail.html
│   │   ├── login.html
│   │   ├── sign_up.html
│   │   ├── sign_up_guide.html
│   │   ├── terms.html
│   │   └── user_info.html
│   ├── img # 해당 서비스에서 랜더링해줄 이미지 디렉토리
│   ├── js
│   │   ├── custom.js
│   │   ├── development_constant.js # 개발환경에서의 상수
│   │   ├── drop_out.js
│   │   ├── edit_contact.js
│   │   ├── edit_nickname.js
│   │   ├── edit_profileImage.js
│   │   ├── edit_pw.js
│   │   ├── footer.js
│   │   ├── free_board.js
│   │   ├── free_board_detail.js
│   │   ├── free_board.write.js
│   │   ├── header.js
│   │   ├── home_login.js
│   │   ├── home_not_login.js
│   │   ├── library.js
│   │   ├── library_detail.js
│   │   ├── login.js
│   │   ├── menu.js
│   │   ├── production_constant.js # 배포환경에서의 상수
│   │   ├── sign_up.js
│   │   ├── sign_up_guide.js
│   │   ├── sweet_alert2.js # sweetAlert2 라이브러리
│   │   └── terms.js
├── .env
├── .eslintrc
├── .gitignore
├── .prettierrc
├── app.js
├── package.json
├── package-lock.json
├── sitemap.xml 
└──  README.md
    # robots.txt 는 txt 파일을 따로 두지 않고 미들웨어에 바로 삽입해줬습니다.
```


## :blue_book: 주요 기능

<details>
    <summary> 메뉴바 </summary>

* 뷰포트가 특정 넓이 이하로 내려갔을 때 오른쪽 상단의 메뉴버튼을 누를때만 메뉴창 활성화
    
* 메뉴버튼을 눌렀을 때 1초간 fade-in 하도록 animation 설정 

<!-- summary 아래 한칸 공백 두고 내용 삽입 -->

</details>

<details>
    <summary> 유효성 검사 </summary>
    
* 회원가입 이용약관 페이지에서 약관을 읽지 않을 시 '약관동의' 체크박스에 체크되지 않도록 함
    
* 회원가입, 유저 정보 수정 시 백엔드 서버에 요청하지 않고도 유효성 검사 해줄 수 있는 부분 유효성 체크        
    * 입력 전 툴팁 아이콘에 커서를 올리면 유효조건 체크 가능
    * 입력 시 정규표현식으로 입력값의 형식과 글자수 체크
    * 입력 후 입력값이 유효하지 않을 때와 유효할 때 input창의 배경의 색상으로 입력한 값이 유효한지 유효하지 않은지 가시적으로 구분 가능하도록 함
    
* 게시판 글,댓글, 도서관 후기 작성 및 수정 시 글자수 체크
* 게시글 해시태그 유효조건 툴팁을 통해 미리 확인 가능하고 입력 후 유효하지 않을 시 구체적으로 어떤 부분이 유효하지 않은지 알림 뜨도록 함
    * 조건1. 첫글자가 #이어야 유효
    * 조건2. #을 구분자로 파싱했을 때 배열 길이가 5개 이하여야 유효
    * 조건3. 하나의 배열 요소당 2~8글자 사이의 한국어로만 이루어져야만 유효
 
<!-- summary 아래 한칸 공백 두고 내용 삽입 -->

</details>

