import "./styles.scss";
import {ErrorPage, errorPage404, errorPage500 } from "./pages/erorrs/errors";
// import { Login, loginPage } from "./pages/login/login";
import { signinPage } from "./pages/signin/signnin";
import { chatPage } from "./pages/chat/chat";
// import { render } from "./utils/render";
import { router } from "./router/router";
import store from "./store/store";
import { ErrorPage500 } from "./pages/erorrs/error500";
import Login from "./pages/login";
import Signin from "./pages/signin";
import Profile from "./pages/profile/profile";
import ChangeData from "./pages/profile/changeData";
import changePassword from "./pages/profile/changePassword";
import Chat from "./pages/chat";
import actions from "./store/actions";

document.querySelector(".nav__btn")?.addEventListener("click", () => {
  document.querySelector<HTMLElement>(".nav")!.style.display = "none";
});

window.AppStore = store;

function withAuth(block) {
  const { user = {} } = store.getState();
  if (user) {
    return block;
  }
  return ErrorPage;
}

// const route = document.location.pathname;
window.chat = Chat
router
  .use("/404", "error 404 - заголовок", ErrorPage)
  .use("/500", "error 500 - заголовок", ErrorPage500)
  .use("/login", "log in - заголовок", Login)
  .use("/signin", "sign in - заголовок", Signin)
  .use("/profile", "profile - заголовок", withAuth(Profile))
  .use("/changeData", "change data - заголовок", ChangeData)
  .use("/changePassword", "change password - заголовок", changePassword)
  .use("/", "messenger - заголовок", Chat)
  .start();
// console.log(router);
// setTimeout(() => {
//   router.go("/changeData");
// }, 3000);

// if (route === "/404") {
//   render("#root", errorPage404);
// }

// if (route === "/500") {
//   render("#root", errorPage500);
// }

// if (route === "/login") {
//   render("#root", loginPage);
// }

// if (route === "/signin") {
//   render("#root", signinPage);
// }

// if (route === "/profile") {
//   render("#root", profilePage);
// }

// if (route === "/changeData") {
//   render("#root", changeDataPage);
// }

// if (route === "/changePassword") {
// // eslint-disable-next-line no-console
//   console.log(
//     "Для проверки валидации используйте следующий старый пароль: 1234567890F",
//   );
//   render("#root", changePassword);
// }

// if (route === "/") {
//   render("#root", chatPage);
// }
