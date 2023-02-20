import template from "./dialogList.hbs";
import Block from "../../utils/Block";
import { Message } from "../Message/message";
import { Date } from "../Date/date";

interface DialogListProps {
    content: Message | Message[] | Date | Date[];
}

export class DialogList extends Block {
  constructor(props: DialogListProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
