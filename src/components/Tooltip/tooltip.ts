import Block from "../../utils/Block";
import { Button } from "../Button/button";
import template from "./tooltip.hbs";
import "./tooltip.scss";

interface TooltipProps {
  headTooltip?: boolean;
  footTooltip?: boolean;
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
