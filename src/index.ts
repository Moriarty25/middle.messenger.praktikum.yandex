import "./styles.scss";
import  {errorPage404, errorPage500 } from "./pages/erorrs/errors";
import { loginPage } from "./pages/login/login";
import { signinPage } from "./pages/signin/signnin";
import { changeDataPage, changePassword, profilePage } from "./pages/profile/profile";
import { chatPage } from "./pages/chat/chat";
// import { render } from "./utils/render";
import { router } from "./router/router";
import store from "./store/store";

document.querySelector(".nav__btn")?.addEventListener("click", () => {
  document.querySelector<HTMLElement>(".nav")!.style.display = "none";
});

window.AppStore = store

// const route = document.location.pathname;

router
  .use("/404", "error 404 - заголовок", errorPage404)
  .use("/500", "error 500 - заголовок", errorPage500)
  .use("/login", "log in - заголовок", loginPage)
  .use("/signin", "sign in - заголовок", signinPage)
  .use("/profile", "profile - заголовок", profilePage)
  .use("/changeData", "change data - заголовок", changeDataPage)
  .use("/changePassword", "change password - заголовок", changePassword)
  .use("/", "messenger - заголовок", chatPage)
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
