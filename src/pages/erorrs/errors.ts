import { Button } from "../../components/Button/button";
import { Navigation } from "../../components/Navigation/navigation";
import { router } from "../../router/router";
import Block from "../../utils/Block";
import template from "./erorrs.hbs";
import "./erorrs.scss";

// interface ErrorProps {
//   title: string;
//   message: string;
//   link: Button;
// }

export class ErrorPage extends Block {
  // constructor(props: ErrorProps) {
  //   super("div", props);
  // }

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
