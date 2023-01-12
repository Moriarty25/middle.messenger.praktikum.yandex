import error from "../src/pages/erorrs/errors";
import login from "../src/pages/login/login";
import "./styles.scss";
import input from "./components/Input/input";
import button from "./components/Button/button";
import signin from "./pages/signin/signnin";
import profile from "./pages/profile/profile";
import defaultUserPhoto from "../static/defaultUserPhoto.png";
import chat from "./pages/chat/chat";


const state = {
  404: {
    title: "404",
    message: "Вы не туда попали",
    link: "Назад к чатам",
  },
  500: {
    title: "500",
    message: "Уже фиксим",
    link: "Назад к чатам",
  },
  login: {
    input: {
      login: input({
        inputType: "text",
        inputName: "login",
        inputPlaceholder: "Логин",
        labelName: "Логин",
        invalid: false,
        message: "Неверный логин",
      }),
      password: input({
        inputName: "password",
        inputType: "password",
        inputPlaceholder: "Пароль",
        labelName: "Пароль",
        invalid: false,
        passwordInvalid: true,
        message: "Неверный пароль",
      }),
    },
    button: {
      primery: button({
        isPrimery: true,
        name: "Войти",
      }),
      default: button({
        name: "Нет аккаунта?",
      }),
    },
  },
  signin: {
    input: {
      email: input({
        inputName: "email",
        inputType: "email",
        inputPlaceholder: "Почта",
        labelName: "Почта",
        invalid: false,
        message: "Неверная почта",
      }),
      login: input({
        inputName: "login",
        inputType: "text",
        inputPlaceholder: "Логин",
        labelName: "Логин",
        invalid: false,
        message: "Неверный логин",
      }),
      firstName: input({
        inputName: "first_name",
        inputType: "text",
        inputPlaceholder: "Имя",
        labelName: "Имя",
      }),
      secondName: input({
        inputName: "second_name",
        inputType: "text",
        inputPlaceholder: "Фамилия",
        labelName: "Фамилия",
      }),
      phone: input({
        inputName: "phone",
        inputType: "tel",
        inputPlaceholder: "Телефон",
        labelName: "Телефон",
      }),
      password: input({
        inputName: "password",
        inputType: "password",
        inputPlaceholder: "Пароль",
        labelName: "Пароль",
        invalid: false,
        passwordInvalid: true,
      }),
      passwordAgain: input({
        inputName: "password",
        inputType: "password",
        inputPlaceholder: "Пароль (ещё раз)",
        labelName: "Пароль (ещё раз)",
        invalid: false,
        passwordInvalid: true,
        message: "Пароли не совпадают",
      }),
    },
    button: {
      primery: button({
        isPrimery: true,
        name: "Зарегистрироваться",
      }),
      default: button({
        name: "Войти?",
      }),
    },
  },
  profile: {
    button: {
      return: button({
        name: "Войти?",
      }),
      changeData: button({
        name: "Изменить данные",
      }),
      changePassword: button({
        name: "Изменить пароль",
      }),
      exit: button({
        isExit: true,
        name: "Выйти",
      }),
      back: button({
        isBack: true,
      }),
      primery: button({
        isPrimery: true,
        name: "Сохранить",
      }),
    },
    userData: {
      email: "privet@yandex.com",
      login: "shaneWrite51",
      firstName: "Шейн",
      secondName: "Райт",
      nameInChat: "Шейнни",
      phone: "+ 7 (909) 967 30 30",
    },
    defaultUserPhoto,
    profile: true,
    changeUserData: false,
    changePassword: false,
  },
  changeData: {
    button: {
      back: button({
        isBack: true,
      }),
      primery: button({
        isPrimery: true,
        name: "Сохранить",
      }),
    },
    defaultUserPhoto,
    changeUserData: true,
  },
  changePassword: {
    button: {
      back: button({
        isBack: true,
      }),
      primery: button({
        isPrimery: true,
        name: "Сохранить",
      }),
    },
    defaultUserPhoto,
    changePassword: true,
  },
};

const root = document.querySelector("#root");
const route = document.location.pathname; 

if (route === "/404") {
  root.innerHTML = error(state[404]);
}

if (route === "/500") {
  root.innerHTML = error(state[500]);
}

if (route === "/login") {
  root.innerHTML = login(state.login);
}

if (route === "/signin") {
  root.innerHTML = signin(state.signin);
}

if (route === "/profile") {
  root.innerHTML = profile(state.profile);
}

if (route === "/changeData") {
  root.innerHTML = profile(state.changeData);
}

if (route === "/changePassword") {
  root.innerHTML = profile(state.changePassword);
}

if (route === "/") {
  document.getElementById("root").innerHTML = chat({});
}
console.log();
