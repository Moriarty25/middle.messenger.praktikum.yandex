import { Button } from "../../components/Button/button";
import { router } from "../../router/router";
import { Navigation } from "../../components/Nav/navigation";
import Block from "../../utils/Block";
import template from "./erorrs.hbs";
import "./erorrs.scss";

export class ErrorPage extends Block {
  init() {
    this.props.title = "404";
    this.props.message = "Вы не туда попали";

    this.children.link = new Button({
      name: "Назад к чатам",
      link: "/messenger",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/messenger");
        },
      },
    });

    this.children.nav = new Navigation({});
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
