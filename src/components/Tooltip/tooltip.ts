import Block from "../../utils/Block";
import { Button } from "../Button/button";
import { Input } from "../Input/input";
import template from "./tooltip.hbs";
import "./tooltip.scss";

interface TooltipProps {
  createChatSend?: Button;
  headTooltip?: boolean;
  footTooltip?: boolean;
  deleteUser?: Button;
  addUser?: Button;
  inputCreateChat?: Input;
  buttonMenu?: Button;
  events?: {
    mouseleave?: (event: MouseEvent) => void;
  };
}

export class Tooltip extends Block {
  constructor(props: TooltipProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
