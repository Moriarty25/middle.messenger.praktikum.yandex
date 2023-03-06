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
import Actions from "../../store/actions";
import { Navigation } from "../../components/Nav/navigation";

// import { signupContoller } from "../../store/actions";

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

  protected init(): void {
    this.children.email = new Fieldset({
      input: new Input({
        inputName: "email",
        inputType: "email",
        inputPlaceholder: "Почта",
        events: {
          blur: (event) => {
            state.formRegistration.email = onValidate(
              event,
              this.children.email,
              validateEmail
            );
          },
        },
      }),
      labelName: "Почта",
      invalid: true,
      message: "",
    });

    this.children.login = new Fieldset({
      input: new Input({
        inputType: "text",
        inputName: "login",
        inputPlaceholder: "Логин",
        events: {
          blur: (event) => {
            state.formRegistration.login = onValidate(
              event,
              this.children.login,
              validateLogin
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
    });

    this.children.firstName = new Fieldset({
      input: new Input({
        inputType: "text",
        inputName: "first_name",
        inputPlaceholder: "Имя",
        events: {
          blur: (event) => {
            state.formRegistration.first_name = onValidate(
              event,
              this.children.firstName,
              validateFirstName
            );
          },
        },
      }),
      labelName: "Имя",
      invalid: true,
      message: "",
    });
    this.children.secondName = new Fieldset({
      input: new Input({
        inputType: "text",
        inputName: "second_name",
        inputPlaceholder: "Фамилия",
        events: {
          blur: (event) => {
            state.formRegistration.second_name = onValidate(
              event,
              this.children.secondName,
              validateSecondName
            );
          },
        },
      }),
      labelName: "Фамилия",
      invalid: true,
      message: "",
    });

    this.children.phone = new Fieldset({
      input: new Input({
        inputType: "tel",
        inputName: "phone",
        inputPlaceholder: "Телефон",
        events: {
          blur: (event) => {
            state.formRegistration.phone = onValidate(
              event,
              this.children.phone,
              validatePhone
            );
          },
        },
      }),
      labelName: "Телефон",
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
            const text = (event.target as HTMLInputElement).value;
            this.children.password.setProps({
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
    });

    this.children.passwordAgain = new Fieldset({
      input: new Input({
        inputName: "password",
        inputType: "password",
        inputPlaceholder: "Пароль ещё раз",
        events: {
          blur: (event) => {
            const text = (event.target as HTMLInputElement).value;
            this.children.passwordAgain.setProps({
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
    });

    this.children.primary = new Button({
      isPrimary: true,
      name: "Зарегистрироваться",
      events: {
        click: (event) => {
          // eslint-disable-next-line no-use-before-define
          this.onSubmitvalidationSignin(event);
        },
      },
    });

    this.children.default = new Button({
      name: "Войти?",
      link: "/",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/");
        },
      },
    });

    this.children.nav = new Navigation({});
  }

  onSubmitvalidationSignin(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    // document.querySelector('[name=login]').focus()
    if (
      state.formRegistration.password !== state.formRegistration.passwordAgain
    ) {
      this.children.passwordAgain.setProps({
        message: "Пароли не совпадают",
      });
    } else if (
      validateLogin(state.formRegistration.login) === "" &&
      validateEmail(state.formRegistration.email) === "" &&
      validateFirstName(state.formRegistration.first_name) === "" &&
      validateSecondName(state.formRegistration.second_name) === "" &&
      validatePhone(state.formRegistration.phone) === "" &&
      validatePassword(state.formRegistration.password) === "" &&
      validatePassword(state.formRegistration.passwordAgain) === ""
    ) {
      // eslint-disable-next-line no-console
      console.log(
        Object.fromEntries(Object.entries(state.formRegistration).slice(0, 6))
      );
      Actions.signupContoller(
        Object.fromEntries(Object.entries(state.formRegistration).slice(0, 6))
      ).then((res) => {
        this.children.login.setProps({ message: res });
      });
    } else {
      this.children.login.setProps({
        message: validateLogin(state.formRegistration.login),
      });
      this.children.email.setProps({
        message: validateEmail(state.formRegistration.email),
      });
      this.children.firstName.setProps({
        message: validateFirstName(state.formRegistration.first_name),
      });
      this.children.secondName.setProps({
        message: validateSecondName(state.formRegistration.second_name),
      });
      this.children.phone.setProps({
        message: validatePhone(state.formRegistration.phone),
      });
      this.children.password.setProps({
        message: validatePassword(state.formRegistration.password),
      });
      this.children.passwordAgain.setProps({
        message: validatePassword(state.formRegistration.passwordAgain),
      });
    }
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
