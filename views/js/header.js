document.write(`
<!-- 맨 위에 메뉴바 -->
<nav class="gmb">
  <!-- 로고 -->
  <a href="/">
    <div class="gmb__logo">
      <img class="gmb__logo--img" src="/views/img/logo.png" alt="서비스 로고" />
      myStudyLibrary
    </div>
  </a>
  <!-- 메뉴 -->
  <ul class="gmb__menu">
    <li><a href="/library">주변도서관</a></li>
    <li><a href="/board">자유게시판</a></li>
  </ul>
  <a href="#" class="gmb__toogleBtn">
              <img class="gmb__toogleBtn--img" src="/views/img/menu.png" alt="메뉴 버튼" /></a>
    <script src="/views/build/menu.js" type="text/javascript"></script>
</nav>`);
