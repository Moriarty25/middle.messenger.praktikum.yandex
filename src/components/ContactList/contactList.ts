import template from "./contactList.hbs";
import Block from "../../utils/Block";
import { Contact } from "../../types/chatPage";

interface ContactListProps {
    content: Contact | Contact[];
}

export class ContactList extends Block {
  constructor(props: ContactListProps) {
    super("div", props);
  }

  render() {
    console.log(this);
    return this.compile(template, { ...this.props });
  }
}
