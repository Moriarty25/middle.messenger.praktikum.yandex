import template from "./navigation.hbs";
import Block from "../../utils/Block";
import { Button } from "../Button/button";
import { router } from "../../router/router";

interface ListItemProps {
  content?: string;
  btnDelete?: Button;
  events?: {
    click?: () => void;
  };
}

export class Navigation extends Block {
  constructor(props: ListItemProps) {
    super("div", props);
  }

  protected init(): void {
    this.children.messenger = new Button({
      name: "Страница чата",
      link: "/messenger",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/messenger");
        },
      },
    });
    this.children.profile = new Button({
      name: "Страница Профиля",
      link: "/settings",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/settings");
        },
      },
    });
    this.children.changeData = new Button({
      name: "Страница Изменения данных",
      link: "/changeData",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/changeData");
        },
      },
    });
    this.children.changePassword = new Button({
      name: "Страница Изменения пароля",
      link: "/changePassword",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/changePassword");
        },
      },
    });
    this.children.login = new Button({
      name: "Страница Авторизации",
      link: "/",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/");
        },
      },
    });
    this.children.signin = new Button({
      name: "Страница Регистрации",
      link: "/sign-up",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/sign-up");
        },
      },
    });
    this.children.e404 = new Button({
      name: "Страница 404",
      link: "/404",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/404");
        },
      },
    });
    this.children.e500 = new Button({
      name: "Страница 500",
      link: "/500",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/500");
        },
      },
    });

    this.children.navBtn = new Button({
      isNav: true,
      events: {
        click: () => {
        document.querySelector<HTMLElement>(".nav")!.style.display = "none";
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
