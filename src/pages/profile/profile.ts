/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import { Button } from "../../components/Button/button";
import Block from "../../utils/Block";
import template from "./profile.hbs";
import "./profile.scss";
import defaultUserPhoto from "../../../static/defaultUserPhoto.png";
import { Input } from "../../components/Input/input";
import {
  onValidate, validateEmail, validateFirstName, validateLogin, validatePassword, validatePhone,
  validateSecondName,
} from "../../utils/validate";
import { Fieldset } from "../../components/Fieldset/fieldset";
import { router } from "../../router/router";

interface ProfileProps {
  profilePage?: boolean;
  changeUserData?: boolean;
  changeUserPassword?: boolean;
  changeData?: Button;
  changePassword?: Button;
  exit?: Button;
  buttonBack: Button;
  email?: string;
  emailInpit?: Fieldset;
  login?: string;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  phone?: string | number;
  defaultUserPhoto: string;
}

export class Profile extends Block {
  constructor(props: ProfileProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const state = {
  oldPasswordCheck: "1234567890F",
  userData: {
    email: "privet@yandex.com",
    login: "shaneWrite51",
    first_name: "Шейн",
    second_name: "Райт",
    display_name: "Шейнни",
    phone: "8800553535",
    oldPassword: "",
    newPassword: "",
    newPasswordAgain: "",
  },
};

const pageBuilder = {

  profile: {
    profilePage: true,

    changeData: new Button({
      name: "Изменить данные",
      link: "/changeData",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/changeData");
        },
      },
    }),
    changePassword: new Button({
      name: "Изменить пароль",
      link: "/changePassword",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/changePassword");
        },
      },
    }),
    exit: new Button({
      isExit: true,
      name: "Выйти",
      link: "/login",
      events: {
        click: (event) => {
          event?.preventDefault();
          router.go("/login");
        },
      },
    }),
    buttonBack: new Button({
      isBack: true,
      link: "/",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/");
        },
      },
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
      link: "profile",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/profile");
        },
      },
    }),
    primary: new Button({
      isPrimary: true,
      name: "Сохранить",
      events: {
        click: (event) => {
          onSubmitValidationChangeData(event);
        },
      },
    }),
    emailInpit: new Fieldset({
      input: new Input({
        inputName: "email",
        inputType: "email",
        inputPlaceholder: "Новая почта",
        value: "shane-wrigth@yandex.com",
        events: {
          blur: (event) => {
            state.userData.email = onValidate(
              event,
              pageBuilder.changeData.emailInpit,
              validateEmail,
            );
          },
        },
      }),
      invalid: true,
      isChangingPage: true,
      message: "",
    }),
    loginInpit: new Fieldset({
      input: new Input({
        inputName: "login",
        inputType: "text",
        inputPlaceholder: "Новый логин",
        value: "shanewright51",
        events: {
          blur: (event) => {
            state.userData.login = onValidate(
              event,
              pageBuilder.changeData.loginInpit,
              validateLogin,
            );
          },
        },
      }),
      invalid: true,
      isChangingPage: true,
      message: "",
    }),
    firstNameInpit: new Fieldset({
      input: new Input({
        inputName: "first_name",
        inputType: "text",
        inputPlaceholder: "Введите имя",
        value: "Шейн",
        events: {
          blur: (event) => {
            state.userData.first_name = onValidate(
              event,
              pageBuilder.changeData.firstNameInpit,
              validateFirstName,
            );
          },
        },
      }),
      invalid: true,
      isChangingPage: true,
      message: "",
    }),
    secondNameInpit: new Fieldset({
      input: new Input({
        inputName: "second_name",
        inputType: "text",
        inputPlaceholder: "Введите фамилию",
        value: "Райт",
        events: {
          blur: (event) => {
            state.userData.second_name = onValidate(
              event,
              pageBuilder.changeData.secondNameInpit,
              validateSecondName,
            );
          },
        },
      }),
      invalid: true,
      isChangingPage: true,
      message: "",
    }),
    displayNameInpit: new Fieldset({
      input: new Input({
        inputName: "display_name",
        inputType: "text",
        inputPlaceholder: "Желаемое имя в чате",
        value: "Шейнни",
        events: {
          blur: (event) => {
            state.userData.display_name = (event.target as HTMLInputElement).value;
          },
        },
      }),
      invalid: true,
      isChangingPage: true,
      message: "",
    }),
    phoneInpit: new Fieldset({
      input: new Input({
        inputName: "phone",
        inputType: "tel",
        inputPlaceholder: "Телефон",
        value: state.userData.phone,
        events: {
          blur: (event) => {
            state.userData.phone = onValidate(
              event,
              pageBuilder.changeData.phoneInpit,
              validatePhone,
            );
          },
        },
      }),
      invalid: true,
      isChangingPage: true,
      message: "",
    }),
    defaultUserPhoto,
    changeUserData: true,
  },

  changePassword: {
    buttonBack: new Button({
      isBack: true,
      link: "profile",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/profile");
        },
      },
    }),
    primary: new Button({
      isPrimary: true,
      name: "Сохранить",
      events: {
        click: (event) => {
          onSubmitValidationChangePassword(event);
        },
      },
    }),
    oldPasswordInput: new Fieldset({
      input: new Input({
        inputName: "oldPassword",
        inputType: "password",
        inputPlaceholder: "Введите старый пароль",
        value: state.userData.oldPassword,
        events: {
          blur: (event) => {
            state.userData.oldPassword = onValidate(
              event,
              pageBuilder.changePassword.oldPasswordInput,
              validatePassword,
            );
          },
        },
      }),
      invalid: true,
      isChangingPage: true,
      message: "",
    }),
    newPasswordInput: new Fieldset({
      input: new Input({
        inputName: "newPassword",
        inputType: "password",
        inputPlaceholder: "Введите новый пароль",
        value: "",
        events: {
          blur: (event) => {
            state.userData.newPassword = onValidate(
              event,
              pageBuilder.changePassword.newPasswordInput,
              validatePassword,
            );
          },
        },
      }),
      invalid: true,
      isChangingPage: true,
      message: "",
    }),
    newPasswordAgainInput: new Fieldset({
      input: new Input({
        inputName: "newPassword",
        inputType: "password",
        inputPlaceholder: "Введите новый пароль",
        value: "",
        events: {
          blur: (event) => {
            state.userData.newPasswordAgain = onValidate(
              event,
              pageBuilder.changePassword.newPasswordAgainInput,
              validatePassword,
            );
          },
        },
      }),
      invalid: true,
      isChangingPage: true,
      message: "",
    }),

    defaultUserPhoto,
    changeUserPassword: true,
  },
};

function onSubmitValidationChangeData(event: MouseEvent) {
  event.preventDefault();
  // document.querySelector('[name=login]').focus()
  if (
    validateLogin(state.userData.login) === ""
    && validateEmail(state.userData.email) === ""
    && validateFirstName(state.userData.first_name) === ""
    && validateSecondName(state.userData.second_name) === ""
    && validatePhone(state.userData.phone) === ""
  ) {
    console.log(Object.fromEntries(Object.entries(state.userData).slice(0, 6)));
  } else {
    console.log("Пожалуйста, исправьте ошибки");
  }
}

function onSubmitValidationChangePassword(event: MouseEvent) {
  event.preventDefault();

  if (
    validatePassword(state.userData.newPassword) === ""
    && validatePassword(state.userData.newPasswordAgain) === ""
    && state.userData.newPassword === state.userData.newPasswordAgain
    && state.userData.oldPassword === state.oldPasswordCheck
  ) {
    console.log(Object.fromEntries(Object.entries(state.userData).slice(-3)));
  } else if (
    state.userData.oldPassword !== state.oldPasswordCheck
    && state.userData.oldPassword !== ""
  ) {
    pageBuilder.changePassword.oldPasswordInput.setProps({
      message: "Старый пароль неверный",
    });
    console.log(`Ведите старый пароль: ${state.oldPasswordCheck}`);
  } else if (validatePassword(state.userData.newPassword) === ""
    && validatePassword(state.userData.newPasswordAgain) === ""
    && state.userData.newPassword !== state.userData.newPasswordAgain) {
    pageBuilder.changePassword.newPasswordAgainInput.setProps({
      message: "Пароли не совпадают",
    });
  } else {
    console.log("Пожалуйста, исправьте ошибки");
    pageBuilder.changePassword.newPasswordInput.setProps({
      message: validatePassword(state.userData.newPassword),
    });
    pageBuilder.changePassword.newPasswordAgainInput.setProps({
      message: validatePassword(state.userData.newPasswordAgain),
    });
    pageBuilder.changePassword.oldPasswordInput.setProps({
      message: validatePassword(state.userData.oldPassword),
    });
  }
}

export const profilePage = new Profile(pageBuilder.profile);
export const changeDataPage = new Profile(pageBuilder.changeData);
export const changePassword = new Profile(pageBuilder.changePassword);
