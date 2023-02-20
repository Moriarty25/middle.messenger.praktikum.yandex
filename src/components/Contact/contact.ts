import template from "./contact.hbs";
import "./contact.scss";
import { Contact as ContactProps } from "../../types/chatPage";
import Block from "../../utils/Block";

export class Contact extends Block {
  
  title: string;
  avatar: string | undefined;

  unread_count: number;

  content: string;

  constructor(props: ContactProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
