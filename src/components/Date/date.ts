import "./date.scss";
import template from "./date.hbs";
import Block from "../../utils/Block";

interface DateProps {
  content?: string;
  events?: {
    click?: () => void;
  };
}

export class Date extends Block {
  constructor(props: DateProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
