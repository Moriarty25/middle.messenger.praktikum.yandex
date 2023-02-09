import { Button } from "../../components/Button/button";
import { Input } from "../../components/Input/input";
import { Fieldset } from "../../components/Fieldset/fieldset";
import Block from "../../utils/Block";
import {
  onValidate,
  validateEmail,
  validateFirstName,
  validateLogin,
  validatePassword,
  validatePhone,
  validateSecondName,
} from "../../utils/validate";
import template from "./signin.hbs";
import "./signin.scss";
import { router } from "../../router/router";

interface SigninProps {
  email: Fieldset;
  login: Fieldset;
  firstName: Fieldset;
  secondName: Fieldset;
  phone: Fieldset;
  password: Fieldset;
  passwordAgain: Fieldset;
  primary: Button;
  default: Button;
}

export class Signin extends Block {
  constructor(props: SigninProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const state = {
  formRegistration: {
    email: "",
    login: "",
    first_name: "",
    second_name: "",
    phone: "",
    password: "",
    passwordAgain: "",
  },
};

const pageBuilder = {
  email: new Fieldset({
    input: new Input({
      inputName: "email",
      inputType: "email",
      inputPlaceholder: "Почта",
      events: {
        blur: (event) => {
          state.formRegistration.email = onValidate(
            event,
            pageBuilder.email,
            validateEmail,
          );
        },
      },
    }),
    labelName: "Почта",
    invalid: true,
    message: "",
  }),
  login: new Fieldset({
    input: new Input({
      inputType: "text",
      inputName: "login",
      inputPlaceholder: "Логин",
      events: {
        blur: (event) => {
          state.formRegistration.login = onValidate(
            event,
            pageBuilder.login,
            validateLogin,
          );
          // const text = (event.target as HTMLInputElement).value;
          // pageBuilder.login.setProps({
          //   message: validateLogin(text),
          // });
          // state.formRegistration.login = text;
        },
      },
    }),
    labelName: "Логин",
    invalid: true,
    message: "",
  }),
  firstName: new Fieldset({
    input: new Input({
      inputType: "text",
      inputName: "first_name",
      inputPlaceholder: "Имя",
      events: {
        blur: (event) => {
          state.formRegistration.first_name = onValidate(
            event,
            pageBuilder.firstName,
            validateFirstName,
          );
        },
      },
    }),
    labelName: "Имя",
    invalid: true,
    message: "",
  }),
  secondName: new Fieldset({
    input: new Input({
      inputType: "text",
      inputName: "second_name",
      inputPlaceholder: "Фамилия",
      events: {
        blur: (event) => {
          state.formRegistration.second_name = onValidate(
            event,
            pageBuilder.secondName,
            validateSecondName,
          );
        },
      },
    }),
    labelName: "Фамилия",
    invalid: true,
    message: "",
  }),
  phone: new Fieldset({
    input: new Input({
      inputType: "tel",
      inputName: "phone",
      inputPlaceholder: "Телефон",
      events: {
        blur: (event) => {
          state.formRegistration.phone = onValidate(
            event,
            pageBuilder.phone,
            validatePhone,
          );
        },
      },
    }),
    labelName: "Телефон",
    invalid: true,
    message: "",
  }),
  password: new Fieldset({
    input: new Input({
      inputName: "password",
      inputType: "password",
      inputPlaceholder: "Пароль",
      events: {
        blur: (event) => {
          const text = (event.target as HTMLInputElement).value;
          pageBuilder.password.setProps({
            message: validatePassword(text),
          });
          state.formRegistration.password = text;
        },
      },
    }),
    labelName: "Пароль",
    message: "",
    invalid: true,
    passwordInvalid: false,
  }),
  passwordAgain: new Fieldset({
    input: new Input({
      inputName: "password",
      inputType: "password",
      inputPlaceholder: "Пароль ещё раз",
      events: {
        blur: (event) => {
          const text = (event.target as HTMLInputElement).value;
          pageBuilder.passwordAgain.setProps({
            message: validatePassword(text),
          });
          state.formRegistration.passwordAgain = text;
        },
      },
    }),
    labelName: "Пароль ещё раз",
    message: "",
    invalid: true,
    passwordInvalid: false,
  }),

  primary: new Button({
    isPrimary: true,
    name: "Зарегистрироваться",
    events: {
      click: (event) => {
        // eslint-disable-next-line no-use-before-define
        onSubmitvalidationSignin(event);
      },
    },
  }),
  default: new Button({
    name: "Войти?",
    events: {
      click: (event) => {
        event.preventDefault();
        router.go("/login");
      },
    },
  }),
};

function onSubmitvalidationSignin(event: MouseEvent) {
  event.preventDefault();
  // document.querySelector('[name=login]').focus()
  if (
    state.formRegistration.password
    !== state.formRegistration.passwordAgain
  ) {
    pageBuilder.passwordAgain.setProps({
      message: "Пароли не совпадают",
    });
  } else if (
    validateLogin(state.formRegistration.login) === ""
    && validateEmail(state.formRegistration.email) === ""
    && validateFirstName(state.formRegistration.first_name) === ""
    && validateSecondName(state.formRegistration.second_name) === ""
    && validatePhone(state.formRegistration.phone) === ""
    && validatePassword(state.formRegistration.password) === ""
    && validatePassword(state.formRegistration.passwordAgain) === ""
  ) {
    // eslint-disable-next-line no-console
    console.log(state.formRegistration);
  } else {
    pageBuilder.login.setProps({
      message: validateLogin(state.formRegistration.login),
    });
    pageBuilder.email.setProps({
      message: validateEmail(state.formRegistration.email),
    });
    pageBuilder.firstName.setProps({
      message: validateFirstName(state.formRegistration.first_name),
    });
    pageBuilder.secondName.setProps({
      message: validateSecondName(state.formRegistration.second_name),
    });
    pageBuilder.phone.setProps({
      message: validatePhone(state.formRegistration.phone),
    });
    pageBuilder.password.setProps({
      message: validatePassword(state.formRegistration.password),
    });
    pageBuilder.passwordAgain.setProps({
      message: validatePassword(state.formRegistration.passwordAgain),
    });
  }
}

export const signinPage = new Signin(pageBuilder);
