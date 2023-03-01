/* eslint-disable no-new */
import template from "./dialogList.hbs";
import Block from "../../utils/Block";
import { Message } from "../Message/message";
import { stringifyDate } from "../../utils/stringifyDate";
// import { Date } from "../Date/date";

interface DialogListProps {
  text: string;
  owner: string;
  time: string;
}

export class DialogList extends Block {
  constructor(props: DialogListProps) {
    super("div", props);
  }

  render() {
    if (this.props.dialog) {
      this.children.content = this.props.dialog?.map((message: DialogListProps) => new Message({
        text: message?.text,
        isOwner: message.owner === "me",
        time: stringifyDate(message.time),
      }));
    }

    return this.compile(template, { ...this.props });
  }
}
