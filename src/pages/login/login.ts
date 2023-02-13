import template from "./login.hbs";
import "./login.scss";
import { Button } from "../../components/Button/button";
import { Fieldset } from "../../components/Fieldset/fieldset";
import Block from "../../utils/Block";
import {
  onValidate,
  validateLogin,
  validatePassword,
} from "../../utils/validate";
import { Input } from "../../components/Input/input";
import { router } from "../../router/router";
import Actions from "../../store/actions";

const state = {
  formAutorization: {
    login: "",
    password: "",
  },
};

interface LoginProps {
  login: Fieldset;
  password: Fieldset;
  primary: Button;
  default: Button;
}

export class Login extends Block {
  constructor(props: LoginProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const pageBuilder = {
  login: new Fieldset({
    input: new Input({
      inputType: "text",
      inputName: "login",
      inputPlaceholder: "Логин",
      events: {
        blur: (event) => {
          state.formAutorization.login = onValidate(
            event,
            pageBuilder.login,
            validateLogin,
          );
        },
      },
    }),
    labelName: "Логин",
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
          event.stopPropagation();
          state.formAutorization.password = onValidate(
            event,
            pageBuilder.password,
            validatePassword,
          );
        },
      },
    }),
    labelName: "Пароль",
    message: "",
    invalid: true,
    passwordInvalid: false,
  }),
  primary: new Button({
    isPrimary: true,
    name: "Войти",
    events: {
      click: (event) => {
        // eslint-disable-next-line no-use-before-define
        onSubmitvalidationLogin(event);
      },
    },
  }),
  default: new Button({
    name: "Нет аккаунта?",
    link: "signin",
    events: {
      click: (event) => {
        event.preventDefault();
        router.go("/signin");
      },
    },
  }),
};

function onSubmitvalidationLogin(event: MouseEvent) {
  event.preventDefault();
  // document.querySelector('[name=login]').focus()

  if (
    validateLogin(state.formAutorization.login) === ""
    && validatePassword(state.formAutorization.password) === ""
  ) {
    // eslint-disable-next-line no-console
    console.log(state.formAutorization);
    Actions.loginController(state.formAutorization);
  } else if (
    !state.formAutorization.login
    && !state.formAutorization.password
  ) {
    pageBuilder.login.setProps({
      message: validateLogin(state.formAutorization.login),
    });
    pageBuilder.password.setProps({
      message: validatePassword(state.formAutorization.password),
    });
  } else if (!state.formAutorization.login) {
    pageBuilder.login.setProps({
      message: validateLogin(state.formAutorization.login),
    });
  } else if (!state.formAutorization.password) {
    pageBuilder.password.setProps({
      message: validatePassword(state.formAutorization.password),
    });
  }
}

export const loginPage = new Login(pageBuilder);
