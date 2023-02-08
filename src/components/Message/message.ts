import "./message.scss";
import template from "./message.hbs";
import Block from "../../utils/Block";

interface MessageProps {
  text?: string;
  isOwner?: boolean;
  events?: {
    click?: () => void;
  };
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
