// import { UserAvatar } from './../../components/UserAvatar/userAvatar';
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
import connect from "../../store/connect";
import Actions from "../../store/actions";
import store from "../../store/store";
import { userAvatar } from "../../components/UserAvatar/userAvatar";
import UserAvatar from "../../components/UserAvatar";
import actions from "../../store/actions";
import { getFormData } from "../../utils/file";

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
    Actions.getUserController();
    this.props.defaultUserPhoto = defaultUserPhoto;
    // this.props.email = this.props.user ? this.props.user.email : "privet@yandex.com";
    // this.props.login = this.props.user ? this.props.user.login : "shaneWrite51";
    // this.props.first_name = this.props.user ? this.props.user.first_name : "Шейн";
    // this.props.second_name = this.props.user ? this.props.user.second_name : "Райт";
    // this.props.display_name = this.props.user ? this.props.user.display_name : "Шейнни";
    // this.props.phone = this.props.user ? this.props.user.phone : "+ 7 (909) 967 30 30";
  }

  protected init(): void {
    this.props.profilePage = true;

    this.children.changeData = new Button({
      name: "Изменить данные",
      link: "/changeData",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/changeData");
        },
      },
    });

    this.children.changePassword = new Button({
      name: "Изменить пароль",
      link: "/changePassword",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/changePassword");
        },
      },
    });

    this.children.exit = new Button({
      isExit: true,
      name: "Выйти",
      link: "/login",
      events: {
        click: (event) => {
          event?.preventDefault();
          Actions.logoutController();
        },
      },
    });

    this.children.buttonBack = new Button({
      isBack: true,
      link: "/",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/");
        },
      },
    });

    this.children.userAvatar = new UserAvatar({
      // defaultUserPhoto,
      // avatar: this.props.avatar,
      events: {
        change: (event) => {
          actions.changeAvatarController(getFormData(event));
        },
      },
    });
  }

  componentDidMount(): void {
    // this.props.phone = this.props.user.phone;
    // this.setProps({ email: this.props.email });
    Actions.getUserController();
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

export default connect(mapUserToProps)(Profile);
