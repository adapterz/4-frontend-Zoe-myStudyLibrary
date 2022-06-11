// terser
import { minify } from "terser";
import * as fs from "fs";
import path from "path";
import { __dirname } from "../app.js";

export async function build() {
  // option
  const options = {
    compress: {
      defaults: false,
      arrows: true,
      booleans: true,
      directives: true,
      computed_props: true,
      dead_code: false,
      ecma: 5,
      module: true,
      keep_fnames: true,
    },
    mangle: {
      module: true,
      keep_fnames: true,
      reserved: [
        "BACKEND_URL", // 상수 난독화안되도록 하기
        "FRONT_URL",
        "GET",
        "POST",
        "PATCH",
        "DELETE",
        "OK",
        "CREATED",
        "NO_CONTENT",
        "BAD_REQUEST",
        "UNAUTHORIZED",
        "FORBIDDEN",
        "NOT_FOUND",
        "CONFLICT",
        "INTERNAL_SERVER_ERROR",
        "FAIL_FETCH",
        "REQUEST_SUCCESS",
        "LOGIN_REQUIRED",
        "LOGIN",
        "ALREADY_LOGIN",
        "LOGOUT",
        "SIGN_UP",
        "INVALID_BODY",
        "PW_MISMATCHED",
        "NEW_PW_CONFIRM_MISMATCHED",
        "ONLY_IMAGE",
        "DUPLICATED_NICKNAME",
        "NOT_EXIST",
        "NO_COMMENT",
        "FAVORITE",
        "CANCEL_FAVORITE",
        "NOT_AUTHORIZATION",
        "NO_REGISTERED_INFORMATION",
        "INFO",
        "ERROR",
        "SUCCESS",
        "WARNING",
        "QUESTION",
        "CHECK",
        "NON_EXISTENT_LIBRARY",
        "NO_REVIEW",
      ],
    },
  };
  // 파일 minify
  const constant = await setConstant();
  const user = fs.readFileSync(path.join(__dirname, "models", "user.js"), "utf-8");
  const board = fs.readFileSync(path.join(__dirname, "models", "board.js"), "utf-8");
  const comment = fs.readFileSync(path.join(__dirname, "models", "comment.js"), "utf-8");
  const library = fs.readFileSync(path.join(__dirname, "models", "library.js"), "utf-8");
  const review = fs.readFileSync(path.join(__dirname, "models", "review.js"), "utf-8");
  const wise_saying = fs.readFileSync(path.join(__dirname, "models", "wise_saying.js"), "utf-8");
  const custom = fs.readFileSync(path.join(__dirname, "views", "js", "custom.js"), "utf-8");
  // 개발 단계 빌드인지 배포 단계 빌드인지에 따라 constant 다른 파일 불러오기
  async function setConstant() {
    if (process.env.NODE_ENV === "production:build")
      return fs.readFileSync(path.join(__dirname, "views", "js", "production_constant.js"), "utf-8");
    if (process.env.NODE_ENV === "development:build")
      return fs.readFileSync(path.join(__dirname, "views", "js", "development_constant.js"), "utf-8");
  }
  // drop_out 페이지 js 파일
  const drop_out = await minify(
    {
      "constant.js": constant,
      "user.js": user,
      "custom.js": custom,
      "drop_out.js": fs.readFileSync(path.join(__dirname, "views", "js", "drop_out.js"), "utf-8"),
    },
    options
  );
  // edit_contact 페이지 js 파일
  const edit_contact = await minify(
    [constant, user, custom, fs.readFileSync(path.join(__dirname, "views", "js", "edit_contact.js"), "utf-8")],
    options
  );
  // edit_nickname 페이지 js 파일
  const edit_nickname = await minify(
    [constant, user, custom, fs.readFileSync(path.join(__dirname, "views", "js", "edit_nickname.js"), "utf-8")],
    options
  );
  // edit_profileImage 페이지 js 파일
  const edit_profileImage = await minify(
    [constant, user, custom, fs.readFileSync(path.join(__dirname, "views", "js", "edit_profileImage.js"), "utf-8")],
    options
  );
  // edit_pw 페이지 js 파일
  const edit_pw = await minify(
    [constant, user, custom, fs.readFileSync(path.join(__dirname, "views", "js", "edit_pw.js"), "utf-8")],
    options
  );
  // 각 페이지에 쓰이는 여러 js 파일 난독화/축소화
  // free_board 페이지 js 파일
  const free_board = await minify(
    [constant, user, board, custom, fs.readFileSync(path.join(__dirname, "views", "js", "free_board.js"), "utf-8")],
    options
  );
  // free_board_detail 페이지 js 파일
  const free_board_detail = await minify(
    [
      constant,
      user,
      board,
      comment,
      custom,
      fs.readFileSync(path.join(__dirname, "views", "js", "free_board_detail.js"), "utf-8"),
    ],
    options
  );
  // free_board_write 페이지 js 파일
  const free_board_write = await minify(
    [constant, board, custom, fs.readFileSync(path.join(__dirname, "views", "js", "free_board_write.js"), "utf-8")],
    options
  );
  // home_login
  const home_login = await minify(
    [
      constant,
      board,
      user,
      wise_saying,
      custom,
      fs.readFileSync(path.join(__dirname, "views", "js", "home_login.js"), "utf-8"),
    ],
    options
  );
  // home_not_login
  const home_not_login = await minify(
    [
      constant,
      board,
      user,
      wise_saying,
      custom,
      fs.readFileSync(path.join(__dirname, "views", "js", "home_not_login.js"), "utf-8"),
    ],
    options
  );

  // login
  const login = await minify(
    [constant, user, custom, fs.readFileSync(path.join(__dirname, "views", "js", "login.js"), "utf-8")],
    options
  );
  // sign_up
  const sign_up = await minify(
    [constant, user, custom, fs.readFileSync(path.join(__dirname, "views", "js", "sign_up.js"), "utf-8")],
    options
  );
  // sign_up_guide
  const sign_up_guide = await minify(
    [constant, user, fs.readFileSync(path.join(__dirname, "views", "js", "sign_up_guide.js"), "utf-8")],
    options
  );

  // terms
  const terms = await minify(
    [constant, user, fs.readFileSync(path.join(__dirname, "views", "js", "terms.js"), "utf-8")],
    options
  );
  // user_comment
  const user_comment = await minify(
    [constant, user, comment, custom, fs.readFileSync(path.join(__dirname, "views", "js", "user_comment.js"), "utf-8")],
    options
  );
  // user_post
  const user_post = await minify(
    [constant, user, board, custom, fs.readFileSync(path.join(__dirname, "views", "js", "user_post.js"), "utf-8")],
    options
  );
  // library
  const library_page = await minify(
    [constant, library, custom, fs.readFileSync(path.join(__dirname, "views", "js", "library.js"), "utf-8")],
    options
  );
  // library_detail
  const library_detail = await minify([
    constant,
    library,
    user,
    review,
    custom,
    fs.readFileSync(path.join(__dirname, "views", "js", "library_detail.js"), "utf-8"),
  ]);
  // 메뉴
  const menu = await minify([fs.readFileSync(path.join(__dirname, "views", "js", "menu.js"), "utf-8")]);
  // outfile
  fs.writeFileSync("views/build/drop_out.js", drop_out.code, "utf8");
  fs.writeFileSync("views/build/edit_contact.js", edit_contact.code, "utf8");
  fs.writeFileSync("views/build/edit_nickname.js", edit_nickname.code, "utf8");
  fs.writeFileSync("views/build/edit_profileImage.js", edit_profileImage.code, "utf8");
  fs.writeFileSync("views/build/edit_pw.js", edit_pw.code, "utf8");
  fs.writeFileSync("views/build/free_board.js", free_board.code, "utf8");
  fs.writeFileSync("views/build/free_board_detail.js", free_board_detail.code, "utf8");
  fs.writeFileSync("views/build/free_board_write.js", free_board_write.code, "utf8");
  fs.writeFileSync("views/build/home_login.js", home_login.code, "utf8");
  fs.writeFileSync("views/build/home_not_login.js", home_not_login.code, "utf8");
  fs.writeFileSync("views/build/login.js", login.code, "utf8");
  fs.writeFileSync("views/build/sign_up.js", sign_up.code, "utf8");
  fs.writeFileSync("views/build/sign_up_guide.js", sign_up_guide.code, "utf8");
  fs.writeFileSync("views/build/terms.js", terms.code, "utf8");
  fs.writeFileSync("views/build/user_comment.js", user_comment.code, "utf8");
  fs.writeFileSync("views/build/user_post.js", user_post.code, "utf8");
  fs.writeFileSync("views/build/library.js", library_page.code, "utf8");
  fs.writeFileSync("views/build/library_detail.js", library_detail.code, "utf8");
  fs.writeFileSync("views/build/menu.js", menu.code, "utf8");
}
