/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import { Button } from "../../components/Button/button";
import Block from "../../utils/Block";
import template from "./profile.hbs";
import "./profile.scss";
import defaultUserPhoto from "../../../static/defaultUserPhoto.png";
import { Input } from "../../components/Input/input";
import { onValidate, validatePassword } from "../../utils/validate";
import { Fieldset } from "../../components/Fieldset/fieldset";
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
  emailInpit?: Fieldset;
  login?: string;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  phone?: string | number;
  defaultUserPhoto: string;
}

export class changePassword extends Block {
  constructor(props: ProfileProps) {
    super("div", props);
    this.props.defaultUserPhoto = defaultUserPhoto;
    this.props.changeUserPassword = true;
  }

  protected init(): void {
    this.children.buttonBack = new Button({
      isBack: true,
      link: "profile",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/settings");
        },
      },
    });

    this.children.primary = new Button({
      isPrimary: true,
      name: "Сохранить",
      events: {
        click: (event) => {
          this.onSubmitValidationChangePassword(event);
        },
      },
    });

    this.children.oldPasswordInput = new Fieldset({
      input: new Input({
        inputName: "oldPassword",
        inputType: "password",
        inputPlaceholder: "Введите старый пароль",
        value: "",
        events: {
          blur: (event) => {
            state.userData.oldPassword = onValidate(
              event,
              this.children.oldPasswordInput,
              validatePassword,
            );
          },
        },
      }),
      invalid: true,
      isChangingPage: true,
      message: "",
    });

    this.children.newPasswordInput = new Fieldset({
      input: new Input({
        inputName: "newPassword",
        inputType: "password",
        inputPlaceholder: "Введите новый пароль",
        value: "",
        events: {
          blur: (event) => {
            state.userData.newPassword = onValidate(
              event,
              this.children.newPasswordInput,
              validatePassword,
            );
          },
        },
      }),
      invalid: true,
      isChangingPage: true,
      message: "",
    });

    this.children.newPasswordAgainInput = new Fieldset({
      input: new Input({
        inputName: "newPassword",
        inputType: "password",
        inputPlaceholder: "Введите новый пароль",
        value: "",
        events: {
          blur: (event) => {
            state.userData.newPasswordAgain = onValidate(
              event,
              this.children.newPasswordAgainInput,
              validatePassword,
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
        change: (event: InputEvent) => {
          actions.changeAvatarController(getFormData(event));
        },
      },
    });

    this.children.nav = new Navigation({});
  }

  onSubmitValidationChangePassword(event: MouseEvent) {
    event.preventDefault();

    if (
      validatePassword(state.userData.newPassword) === ""
      && validatePassword(state.userData.newPasswordAgain) === ""
      && state.userData.newPassword === state.userData.newPasswordAgain
    ) {
      console.log(Object.fromEntries(Object.entries(state.userData).slice(-3)));
      actions.changeUserPasswordController(state.userData).then((res) => {
        this.children.oldPasswordInput.setProps({ message: res });
      });
    } else if (
      validatePassword(state.userData.newPassword) === ""
      && validatePassword(state.userData.newPasswordAgain) === ""
      && state.userData.newPassword !== state.userData.newPasswordAgain
    ) {
      this.children.newPasswordAgainInput.setProps({
        message: "Пароли не совпадают",
      });
    } else {
      // console.log("Пожалуйста, исправьте ошибки");
      this.children.newPasswordInput.setProps({
        message: validatePassword(state.userData.newPassword),
      });
      this.children.newPasswordAgainInput.setProps({
        message: validatePassword(state.userData.newPasswordAgain),
      });
      this.children.oldPasswordInput.setProps({
        message: validatePassword(state.userData.oldPassword),
      });
    }
  }

  componentDidMount(): void {
    if (!this.props.user) {
      actions.getUserController();
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const state = {
  // oldPasswordCheck: "123456789F",
  userData: {
    oldPassword: "",
    newPassword: "",
    newPasswordAgain: "",
  },
};

function mapUserToProps(state: storeDataType) {
  return {
    avatar: state.user?.avatar
      ? `${BASE_URL}/resources/${state.user.avatar}`
      : defaultUserPhoto,
  };
}

export default connect(mapUserToProps)(
  changePassword as unknown as typeof Block,
);
