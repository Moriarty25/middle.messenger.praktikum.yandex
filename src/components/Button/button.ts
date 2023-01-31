import Block from "../../utils/Block";
import template from "./button.hbs";
import "./button.scss";

interface ButtonProps {
  name?: string;
  isBack?: boolean;
  isMenu?: boolean;
  isAttachment?: boolean;
  isSend?: boolean;
  isPrimary?: boolean;
  isExit?: boolean;
  events?: {
    click?: (event: MouseEvent) => void;
    mouseenter?: (event: MouseEvent) => void;
    mouseleave?: (event: MouseEvent) => void;
  };
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
