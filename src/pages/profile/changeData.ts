/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import { Button } from "../../components/Button/button";
import Block from "../../utils/Block";
import template from "./profile.hbs";
import "./profile.scss";
import defaultUserPhoto from "../../../static/defaultUserPhoto.png";
import Input from "../../components/Input";
import {
  onValidate, validateEmail, validateFirstName, validateLogin, validatePassword, validatePhone,
  validateSecondName,
} from "../../utils/validate";
import Fieldset from "../../components/Fieldset";
import { router } from "../../router/router";
import connect from "../../store/connect";
import actions from "../../store/actions";
import { getFormData } from "../../utils/file";
import UserAvatar from "../../components/UserAvatar";
import store, { StoreEvents } from "../../store/store";

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

export class changeData extends Block {
  constructor(props: ProfileProps) {
    super("div", props);
    this.props.defaultUserPhoto = defaultUserPhoto;
    this.props.changeUserData = true;
  }

  lState = {
    oldPasswordCheck: "1234567890F",
    userData: {
      email: this.props.email,
      login: this.props?.login,
      first_name: "Шейн",
      second_name: "Райт",
      display_name: "Шейнни",
      phone: "8800553535",
      oldPassword: "",
      newPassword: "",
      newPasswordAgain: "",
    },
  };

  protected init(): void {
    this.children.buttonBack = new Button({
      isBack: true,
      link: "profile",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/profile");
        },
      },
    });

    this.children.primary = new Button({
      isPrimary: true,
      name: "Сохранить",
      events: {
        click: (event) => {
          this.onSubmitValidationChangeData(event);
        },
      },
    });

    this.children.emailInpit = new Fieldset({
      input: new Input({
        inputName: "email",
        inputType: "email",
        inputPlaceholder: "Новая почта",
        value: this.props.email ? this.props.email : state.userData.email,
        events: {
          blur: (event) => {
            console.log(this.lState.userData.email);
            state.userData.email = onValidate(
              event,
              this.children.emailInpit,
              validateEmail,
            );
          },
        },
      }),
      invalid: true,
      isChangingPage: true,
      message: "",
    });

    this.children.loginInpit = new Fieldset({
      input: new Input({
        inputName: "login",
        inputType: "text",
        inputPlaceholder: "Новый логин",
        value: this.props?.login,
        events: {
          blur: (event) => {
            state.userData.login = onValidate(
              event,
              this.children.loginInpit,
              validateLogin,
            );
          },
        },
      }),
      invalid: true,
      isChangingPage: true,
      message: "",
    });

    this.children.firstNameInpit = new Fieldset({
      input: new Input({
        inputName: "first_name",
        inputType: "text",
        inputPlaceholder: "Введите имя",
        value: this.props?.first_name,
        events: {
          blur: (event) => {
            state.userData.first_name = onValidate(
              event,
              this.children.firstNameInpit,
              validateFirstName,
            );
          },
        },
      }),
      invalid: true,
      isChangingPage: true,
      message: "",
    });

    this.children.secondNameInpit = new Fieldset({
      input: new Input({
        inputName: "second_name",
        inputType: "text",
        inputPlaceholder: "Введите фамилию",
        value: this.props?.second_name,
        events: {
          blur: (event) => {
            state.userData.second_name = onValidate(
              event,
              this.children.secondNameInpit,
              validateSecondName,
            );
          },
        },
      }),
      invalid: true,
      isChangingPage: true,
      message: "",
    });

    this.children.displayNameInpit = new Fieldset({
      input: new Input({
        inputName: "display_name",
        inputType: "text",
        inputPlaceholder: "Желаемое имя в чате",
        value: this.props?.display_name,
        events: {
          blur: (event) => {
            state.userData.display_name = (
              event.target as HTMLInputElement
            ).value;
          },
        },
      }),
      invalid: true,
      isChangingPage: true,
      message: "",
    });

    this.children.phoneInpit = new Fieldset({
      input: new Input({
        inputName: "phone",
        inputType: "tel",
        inputPlaceholder: "Телефон",
        value: state.userData.phone,
        events: {
          blur: (event) => {
            state.userData.phone = onValidate(
              event,
              this.children.phoneInpit,
              validatePhone,
            );
          },
        },
      }),
      invalid: true,
      isChangingPage: true,
      message: "",
    });

    this.children.userAvatar = new UserAvatar({
      events: {
        change: (event) => {
          actions.changeAvatarController(getFormData(event));
        },
      },
    });
  }

  onSubmitValidationChangeData(event: MouseEvent) {
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
      actions.changeUserDataController(Object
        .fromEntries(Object.entries(state.userData).slice(0, 6)))
    } else {
      console.log("Пожалуйста, исправьте ошибки");
    }
  }

  componentDidMount(): void {
    actions.getUserController();
    // this.props.phone = this.props.user.phone;
    // this.setProps({ email: this.props.email });
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

function mapUserToProps(state: any) {
  return {
    login: state.user?.login,
    email: state.user?.email,
    first_name: state.user?.first_name,
    second_name: state.user?.second_name,
    display_name: state.user?.display_name ? state.user.display_name : "",
    avatar: state.user?.avatar ? `https://ya-praktikum.tech/api/v2/resources/${state.user.avatar}`
      : defaultUserPhoto,
    phone: state.user?.phone,
  };
}

export default connect(mapUserToProps)(changeData);
