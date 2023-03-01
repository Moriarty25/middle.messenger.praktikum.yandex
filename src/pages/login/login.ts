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
import { Navigation } from "../../components/Navigation/navigation";

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

type V = string | number | Record<string, (e: Event) => void> | Block<T>;
export type T = Record<string, V>;

export class Login extends Block {
  constructor(props: LoginProps) {
    super("div", props);
  }

  protected init(): void {
    this.children.login = new Fieldset({
      input: new Input({
        inputType: "text",
        inputName: "login",
        inputPlaceholder: "Логин",
        events: {
          blur: (event) => {
            state.formAutorization.login = onValidate(
              event,
              this.children.login,
              validateLogin,
            );
          },
        },
      }),
      labelName: "Логин",
      invalid: true,
      message: "",
    });

    this.children.password = new Fieldset({
      input: new Input({
        inputName: "password",
        inputType: "password",
        inputPlaceholder: "Пароль",
        events: {
          blur: (event) => {
            event.stopPropagation();
            state.formAutorization.password = onValidate(
              event,
              this.children.password,
              validatePassword,
            );
          },
        },
      }),
      labelName: "Пароль",
      message: "",
      invalid: true,
      passwordInvalid: false,
    });

    this.children.primary = new Button({
      isPrimary: true,
      name: "Войти",
      events: {
        click: (event) => {
          // eslint-disable-next-line no-use-before-define
          this.onSubmitvalidationLogin(event);
        },
      },
    });

    this.children.default = new Button({
      name: "Нет аккаунта?",
      link: "sign-up",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/sign-up");
        },
      },
    });

    this.children.nav = new Navigation({});
  }

  onSubmitvalidationLogin(event: MouseEvent) {
    event.preventDefault();
    // document.querySelector('[name=login]').focus()
    if (
      validateLogin(state.formAutorization.login) === ""
      && validatePassword(state.formAutorization.password) === ""
    ) {
      // eslint-disable-next-line no-console
      console.log(state.formAutorization);
      Actions.loginController(state.formAutorization).then((res) => {
        this.children.password.setProps({ message: res });
      });
    } else if (
      !state.formAutorization.login
      && !state.formAutorization.password
    ) {
      this.children.login.setProps({
        message: validateLogin(state.formAutorization.login),
      });
      this.children.password.setProps({
        message: validatePassword(state.formAutorization.password),
      });
    } else if (!state.formAutorization.login) {
      this.children.login.setProps({
        message: validateLogin(state.formAutorization.login),
      });
    } else if (!state.formAutorization.password) {
      this.children.password.setProps({
        message: validatePassword(state.formAutorization.password),
      });
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
