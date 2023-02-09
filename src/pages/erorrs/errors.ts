import { Button } from "../../components/Button/button";
import { router } from "../../router/router";
import Block from "../../utils/Block";
import template from "./erorrs.hbs";
import "./erorrs.scss";

interface ErrorProps {
  title: string;
  message: string;
  link: Button;
}

export class ErrorPage extends Block {
  constructor(props: ErrorProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const state = {
  404: {
    title: "404",
    message: "Вы не туда попали",
    link: new Button({
      name: "Назад к чатам",
      link: "/",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/");
        },
      },
    }),
  },
  500: {
    title: "500",
    message: "Уже фиксим",
    link: new Button({
      name: "Назад к чатам",
      link: "/",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/");
        },
      },
    }),
  },
};

export const errorPage500 = new ErrorPage(state[500]);
export const errorPage404 = new ErrorPage(state[404]);
