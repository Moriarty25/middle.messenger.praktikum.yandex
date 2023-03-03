/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import { Button } from "../../components/Button/button";
import Block from "../../utils/Block";
import template from "./profile.hbs";
import "./profile.scss";
import defaultUserPhoto from "../../../static/defaultUserPhoto.png";
import Input from "../../components/Input";
import {
  onValidate,
  validateEmail,
  validateFirstName,
  validateLogin,
  validatePhone,
  validateSecondName,
} from "../../utils/validate";
import Fieldset from "../../components/Fieldset";
import { router } from "../../router/router";
import connect from "../../store/connect";
import actions from "../../store/actions";
import { getFormData } from "../../utils/file";
import UserAvatar from "../../components/UserAvatar";
import { Navigation } from "../../components/Nav/navigation";
import { storeDataType } from "../../store/store";
import { BASE_URL } from "../../utils/HTTPTransport";

interface ProfileProps {
  profilePage?: boolean;
  changeUserData?: boolean;
  changeUserPassword?: boolean;
  changeData?: Button;
  changePassword?: Button;
  exit?: Button;
  buttonBack: Button;
  email?: string;
  // emailInpit?: Fieldset;
  login?: string;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  phone?: string | number;
  defaultUserPhoto: string;
}
interface userData {
  email?: string;
  login?: string;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  phone?: string;
}
interface localState {
  userData: userData;
}

export class changeData extends Block {
  localState: localState = {
    userData: {},
  };

  constructor(props: ProfileProps) {
    super("div", props);
    this.props.defaultUserPhoto = defaultUserPhoto;
    this.props.changeUserData = true;
  }

  protected init(): void {
    this.children.userAvatar = new UserAvatar({
      events: {
        change: (event: Event) => {
          actions.changeAvatarController(getFormData(event));
        },
      },
    });

    this.children.nav = new Navigation({});
  }

  onSubmitValidationChangeData(event: MouseEvent) {
    event.preventDefault();
    // document.querySelector('[name=login]').focus()
    if (
      validateLogin(this.localState?.userData?.login) === ""
      && validateEmail(this.localState?.userData?.email) === ""
      && validateFirstName(this.localState?.userData?.first_name) === ""
      && validateSecondName(this.localState.userData?.second_name) === ""
      && validatePhone(this.localState.userData?.phone) === ""
    ) {
      actions.changeUserDataController(this.localState?.userData);
    } else {
      console.log("Пожалуйста, исправьте ошибки");
    }
  }

  componentDidMount(): void {
    actions.getUserController();
  }

  preCompile() {
    this.children.buttonBack = new Button({
      isBack: true,
      link: "profile",
      events: {
        click: (event) => {
          event.preventDefault();
          console.log(this.localState);
          router.go("/settings");
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
        value: this.props.email ? this.props.email : "Загрузка...",
        events: {
          blur: (event: FocusEvent) => {
            this.localState.userData!.email = onValidate(
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
        value: this.props?.login ?? "Загрузка...",
        events: {
          blur: (event: FocusEvent) => {
            this.localState.userData!.login = onValidate(
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
        value: this.props?.first_name ?? "Загрузка...",
        events: {
          blur: (event: FocusEvent) => {
            this.localState.userData!.first_name = onValidate(
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
        value: this.props?.second_name ?? "Загрузка...",
        events: {
          blur: (event: FocusEvent) => {
            this.localState.userData!.second_name = onValidate(
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
        value: this.props?.display_name ?? "Загрузка...",
        events: {
          blur: (event: { target: HTMLInputElement }) => {
            this.localState.userData!.display_name = (
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
        value: this.props?.phone ?? "Загрузка...",
        events: {
          blur: (event: FocusEvent) => {
            this.localState.userData!.phone = onValidate(
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
        change: (event: Event) => {
          actions.changeAvatarController(getFormData(event));
        },
      },
    });

    this.localState = {
      userData: {
        email: this.props.email,
        login: this.props?.login,
        first_name: this.props?.first_name,
        second_name: this.props?.second_name,
        display_name: this.props?.display_name,
        phone: this.props?.phone,
      },
    };
  }

  render() {
    this.preCompile();
    return this.compile(template, { ...this.props });
  }
}

function mapUserToProps(state: storeDataType) {
  return {
    login: state.user?.login,
    email: state.user?.email,
    first_name: state.user?.first_name,
    second_name: state.user?.second_name,
    display_name: state.user?.display_name ? state.user.display_name : "",
    avatar: state.user?.avatar
      ? `${BASE_URL}/resources/${state.user.avatar}`
      : defaultUserPhoto,
    phone: state.user?.phone,
  };
}

export default connect(mapUserToProps)(changeData as unknown as typeof Block);
