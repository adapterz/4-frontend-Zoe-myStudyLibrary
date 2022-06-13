# 4-frontend-Zoe-myStudyLibrary


## :books: 내 주변의 도서관 찾는 사이트 :books:

## :closed_book: 프로젝트 설명

사용자의 지역을 입력하면 그 지역의 도서관이 검색되는 복지 사이트 입니다.

각 개별 도서관에 평점, 후기를 남길 수 있고 사이트 사용자들끼리 커뮤니티 글을 공유할 수 있습니다.

---

## :orange_book: 프로젝트 기획

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
│   ├── buildJs.js // js 파일 빌드
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
│   ├── build // 직접 빌드해서 사용하는 디렉토리로 github에는 업로드 하지 않는 디렉토리 입니다.
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
│   ├── img // 해당 서비스에서 랜더링해줄 이미지 디렉토리
│   ├── js
│   │   ├── custom.js
│   │   ├── development_constant.js // 개발환경에서의 상수
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
│   │   ├── production_constant.js // 배포환경에서의 상수
│   │   ├── sign_up.js
│   │   ├── sign_up_guide.js
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
    // robots.txt 는 txt 파일을 따로 두지 않고 미들웨어에 바로 바로 삽입해줬습니다.
```

