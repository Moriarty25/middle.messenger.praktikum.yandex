import Block from "../../utils/Block";
import template from "./erorrs.hbs";
import "./erorrs.scss";

interface ErrorProps {
  title: string;
  message: string;
  link: string
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
    link: "Назад к чатам",
  },
  500: {
    title: "500",
    message: "Уже фиксим",
    link: "Назад к чатам",
  },
};

export const errorPage500 = new ErrorPage(state[500]);
export const errorPage404 = new ErrorPage(state[404]);
