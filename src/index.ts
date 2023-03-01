import "./styles.scss";
import { ErrorPage } from "./pages/erorrs/errors";
import { router } from "./router/router";
import { ErrorPage500 } from "./pages/erorrs/error500";
import Login from "./pages/login";
import Signin from "./pages/signin";
import Profile from "./pages/profile/profile";
import ChangeData from "./pages/profile/changeData";
import changePassword from "./pages/profile/changePassword";
import Chat from "./pages/chat";
import actions from "./store/actions";
import { Button } from "./components/Button/button";

enum ROUTES {
  ERROR = "/404",
  SERVER_ERROR = "/500",
  AUTH_ERROR = "/401",
  LOGIN = "/",
  SIGNIN = "/sign-up",
  PROFILE = "/settings",
  CHANGE_DATA ="/changeData",
  CHANGE_PASSWORD ="/changePassword",
  MESSENGER = "/messenger",
}

export class AuthErrorPage extends ErrorPage {
  init(): void {
    (this.props.title = "401");
    (this.props.message = "Необходимо авторизоваться");
    this.children.link = new Button({
      name: "К авторизации",
      link: "/",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/");
        },
      },
    });
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  router
    .use(ROUTES.ERROR, "Произошла ошибка 404", ErrorPage)
    .use(ROUTES.SERVER_ERROR, "Произошла ошибка сервера", ErrorPage500)
    .use(ROUTES.AUTH_ERROR, "error 401 - заголовок", AuthErrorPage)
    .use(ROUTES.LOGIN, "Вход", Login)
    .use(ROUTES.SIGNIN, "Регистрация", Signin)
    .use(ROUTES.PROFILE, "Профиль", Profile)
    .use(ROUTES.CHANGE_DATA, "Изменить данные", ChangeData)
    .use(ROUTES.CHANGE_PASSWORD, "Изменить пароль", changePassword)
    .use("/messenger", "Мессенджер", Chat);

  let isProtectedRoute = true;

  // eslint-disable-next-line default-case
  switch (window.location.pathname) {
    case ROUTES.AUTH_ERROR:
    case ROUTES.ERROR:
    case ROUTES.SERVER_ERROR:
    case ROUTES.SIGNIN:
    case ROUTES.LOGIN:
      isProtectedRoute = false;
      break;
  }
  try {
    await actions.isUserAuthorized();

    router.start();

    if (!isProtectedRoute) {
      router.go(ROUTES.MESSENGER);
    }
  } catch (e) {
    router.start();
    if (isProtectedRoute) {
      router.go(ROUTES.LOGIN);
    }
  }
});
