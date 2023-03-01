/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import { Button } from "../../components/Button/button";
import Block from "../../utils/Block";
import template from "./profile.hbs";
import "./profile.scss";
import defaultUserPhoto from "../../../static/defaultUserPhoto.png";
import {
  validateEmail,
  validateFirstName,
  validateLogin,
  validatePhone,
  validateSecondName,
} from "../../utils/validate";
import { Fieldset } from "../../components/Fieldset/fieldset";
import { router } from "../../router/router";
import connect from "../../store/connect";
import Actions from "../../store/actions";
import UserAvatar from "../../components/UserAvatar";
import { getFormData } from "../../utils/file";
import { Navigation } from "../../components/Navigation/navigation";
import { storeDataType } from "../../store/store";

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
          // this.props.profilePage = false;
          // this.props.changeUserData = true;
          // render(".root", new changeData({}))
          // console.log(render("#root", new changeData({})));
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
      link: "/",
      events: {
        click: (event) => {
          event?.preventDefault();
          Actions.logoutController();
        },
      },
    });

    this.children.buttonBack = new Button({
      isBack: true,
      link: "/messenger",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/messenger");
        },
      },
    });

    this.children.userAvatar = new UserAvatar({
      events: {
        change: (event: InputEvent) => {
          Actions.changeAvatarController(getFormData(event));
        },
      },
    });

    this.children.nav = new Navigation({});
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
      console.log(
        Object.fromEntries(Object.entries(state.userData).slice(0, 6)),
      );
      Actions.changeUserDataController(state.userData);
    } else {
      console.log("Пожалуйста, исправьте ошибки");
    }
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
  },
};

function mapUserToProps(state: storeDataType) {
  return {
    login: state.user?.login,
    email: state.user?.email,
    first_name: state.user?.first_name,
    second_name: state.user?.second_name,
    display_name: state.user?.display_name ? state.user.display_name : "",
    avatar: state.user?.avatar
      ? `https://ya-praktikum.tech/api/v2/resources/${state.user.avatar}`
      : defaultUserPhoto,
    phone: state.user?.phone,
  };
}

export default connect(mapUserToProps)((Profile as unknown as typeof Block));
