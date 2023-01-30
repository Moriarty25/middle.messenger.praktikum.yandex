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

// const login = (props = {}) => {
//   return template(props);
// };

// export default login;

// const signin = (props = {}) => {
//   return template(props);
// };

// export default signin;
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
            validateLogin
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
            validatePassword
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
        event.preventDefault();
        // document.querySelector('[name=login]').focus()

        if (
          validateLogin(state.formAutorization.login) === "" &&
          validatePassword(state.formAutorization.password) === ""
        ) {
          console.log(state.formAutorization);
          // } else {
          //   state.login.setProps({
          //     message: validateLogin(state.formAutorization.login),
          //   });
          //   state.password.setProps({
          //     message: validatePassword(state.formAutorization.login),
          //   });
          //   console.log("Пожалуйста, исправьте ошибки");
          //   console.log(state.password.setProps({
          //     message: validatePassword(state.formAutorization.login),
          //   }));
        } else if (
          !state.formAutorization.login &&
          !state.formAutorization.password
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
      },
    },
  }),
  default: new Button({
    name: "Нет аккаунта?",
  }),
};

// const form = document.querySelector('form')?.addEventListener('submit', handler(event))
// function handler(event) {
//   console.log(event);

// }
// console.log(form);

export const loginPage = new Login(pageBuilder);

// div ckeck
//отдельно вызывать ыет пропс после инициализации
