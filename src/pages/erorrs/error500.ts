import { Button } from "../../components/Button/button";
import { router } from "../../router/router";
import store, { StoreEvents } from "../../store/store";
import Block from "../../utils/Block";
import template from "./erorrs.hbs";
import "./erorrs.scss";

interface ErrorProps {
  title: string;
  message: string;
  link: Button;
}

export class ErrorPage500 extends Block {
  constructor(props: ErrorProps) {
    super("div", props);

    this.props.title = "500",
    this.props.message = "Уже фиксим"
  }

  init() {
 this.children.link = new Button({
      name: "Назад к чатам",
      link: "/",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/");
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}


// export default connect(mapUserToProps)(errorPage404);
