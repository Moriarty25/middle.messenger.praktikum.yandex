import "./styles.scss";
import defaultUserPhoto from "../static/defaultUserPhoto.png";
import input, { Fieldset } from "./components/Fieldset/fieldset";
import button, { Button } from "./components/Button/button";
import {
  ErrorPage,
  errorPage404,
  errorPage500,
} from "../src/pages/erorrs/errors";
import login, { Login, loginPage } from "../src/pages/login/login";
import signin, { Signin, signinPage } from "./pages/signin/signnin";
import profile, { changeDataPage, changePassword, Profile, profilePage } from "./pages/profile/profile";
import chat, { Chat, chatPage } from "./pages/chat/chat";
import contact, { Contact } from "./components/Contact/contact";
import message, { Message } from "./components/Message/message";
import date, { Date } from "./components/Date/date";
import { render } from "./utils/render";

document.querySelector(".nav__btn").addEventListener("click", (event) => {
  document.querySelector(".nav").style.display = "none"
})

const state = {
  404: {
    title: "404",
    message: "Вы не туда попали",
    link: "Назад к чатам",
  },
  500: {
    title: "500",
    message: "Уже фиксим",
    link: new Button({
      name: "Уже фиксим",
    }),
  },
  login: {
    login: new Fieldset({
      inputType: "text",
      inputName: "login",
      inputPlaceholder: "Логин",
      labelName: "Логин",
      invalid: true,
      message: "Введите логин",
    }),
    password: new Fieldset({
      inputName: "password",
      inputType: "password",
      inputPlaceholder: "Пароль",
      labelName: "Пароль",
      invalid: true,
      passwordInvalid: false,
      message: "Введите пароль",
    }),
    primary: new Button({
      isPrimary: true,
      name: "Войти",
    }),
    default: new Button({
      name: "Нет аккаунта?",
    }),
  },
  signin: {
    email: new Fieldset({
      inputName: "email",
      inputType: "email",
      inputPlaceholder: "Почта",
      labelName: "Почта",
      invalid: false,
      message: "Неверная почта",
    }),
    login: new Fieldset({
      inputName: "login",
      inputType: "text",
      inputPlaceholder: "Логин",
      labelName: "Логин",
      invalid: false,
      message: "Неверный логин",
    }),
    firstName: new Fieldset({
      inputName: "first_name",
      inputType: "text",
      inputPlaceholder: "Имя",
      labelName: "Имя",
    }),
    secondName: new Fieldset({
      inputName: "second_name",
      inputType: "text",
      inputPlaceholder: "Фамилия",
      labelName: "Фамилия",
    }),
    phone: new Fieldset({
      inputName: "phone",
      inputType: "tel",
      inputPlaceholder: "Телефон",
      labelName: "Телефон",
    }),
    password: new Fieldset({
      inputName: "password",
      inputType: "password",
      inputPlaceholder: "Пароль",
      labelName: "Пароль",
      invalid: false,
      passwordInvalid: true,
    }),
    passwordAgain: new Fieldset({
      inputName: "password",
      inputType: "password",
      inputPlaceholder: "Пароль (ещё раз)",
      labelName: "Пароль (ещё раз)",
      invalid: false,
      passwordInvalid: true,
      message: "Пароли не совпадают",
    }),

    primary: new Button({
      isPrimary: true,
      name: "Зарегистрироваться",
      events: {
        click: () => console.log("clicked"),
      },
    }),
    default: new Button({
      name: "Войти?",
      events: {
        click: () => console.log("clicked"),
      },
    }),
  },
  profile: {
    profilePage: true,

    changeData: new Button({
      name: "Изменить данные",
    }),
    changePassword: new Button({
      name: "Изменить пароль",
    }),
    exit: new Button({
      isExit: true,
      name: "Выйти",
    }),
    buttonBack: new Button({
      isBack: true,
    }),

    email: "privet@yandex.com",
    login: "shaneWrite51",
    first_name: "Шейн",
    second_name: "Райт",
    display_name: "Шейнни",
    phone: "+ 7 (909) 967 30 30",

    defaultUserPhoto,
  },

  changeData: {
    buttonBack: new Button({
      isBack: true,
    }),
    primary: new Button({
      isPrimary: true,
      name: "Сохранить",
    }),

    defaultUserPhoto,
    changeUserData: true,
  },
  changePassword: {
    buttonBack: new Button({
      isBack: true,
    }),
    primary: new Button({
      isPrimary: true,
      name: "Сохранить",
    }),

    defaultUserPhoto,
    changeUserPassword: true,
  },

  chat: {
    defaultUserPhoto,
    me: new Message({
      isOwner: true,
      events: {
        click: () => console.log("clicked me"),
      },
    }),
    date: new Date({
      content: "29 февраля",
    }),
    contactArea: [],
    messageBoxes: [],
  },
};

let resultMessageArea = [];
for (let i = 0; i < 5; i++) {
  resultMessageArea.push(
    new Message({
      events: {
        click: (event) => {
          console.log(document.querySelector(".input__message").value);
        },
      },
    })
  );
}
state.chat.messageBoxes = resultMessageArea;

let resultContactArea = [];
for (let i = 0; i < 10; i++) {
  resultContactArea.push(new Contact({ defaultUserPhoto }));
}
state.chat.contactArea = resultContactArea;
state.chat.messageBoxes = [
  ...state.chat.messageBoxes,
  new Date({ content: "22 декабря" }),
  new Message({ isOwner: true }),
];
function lol(text) {
  alert(text);
}

const buttonComponent = new Button({
  name: "click me",
  events: {
    click: () => console.log("clicked"),
  },
});

const primary = new Button({
  isPrimary: true,
  name: "Зарегистрироваться",
  events: {
    click: () => console.log("clicked me"),
  },
});

const root = document.querySelector("#root");
const route = document.location.pathname;
// const errorPage = new Error(state[404])

//как делать SetProps
// state.login.primary.setProps({name: '50055505505', events: { click: ()=>{console.log('heheheheeh');}}})
// state[500].link.setProps({name: 'back'})

if (route === "/404") {
  render("#root", errorPage404);
  // render("#root", errorPage(state[404]))
}
console.log(new ErrorPage(state[500]));
if (route === "/500") {
  render("#root", errorPage500);
  // render("#root", errorPage(state[500]))
}

if (route === "/login") {
  // root.innerHTML = login(state.login);
  render("#root", loginPage);
}

if (route === "/signin") {
  render("#root", signinPage);
}

if (route === "/profile") {
  // root.innerHTML = profile(state.profile);
  render("#root", profilePage);
}

if (route === "/changeData") {
  // root.innerHTML = profile(state.changeData);
  render("#root", changeDataPage);
}

if (route === "/changePassword") {
  // root.innerHTML = profile(state.changePassword);
  console.log("Для проверки валидации используйте следующий старый пароль: 1234567890F" );
  render("#root", changePassword);
 
}

if (route === "/") {
  // document.getElementById("root").innerHTML = chat(state.chat);
  render("#root", chatPage);
}



