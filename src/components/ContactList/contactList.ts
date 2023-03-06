import template from "./contactList.hbs";
import Block from "../../utils/Block";
import { Contact } from "../Contact/contact";
import actions from "../../store/actions";
import defaultUserPhoto from "../../../static/defaultUserPhoto.png";
import { stringifyDate } from "../../utils/stringifyDate";
import { Contact as ContactProps } from "../../types/chatPage";
import { BASE_URL } from "../../utils/HTTPTransport";
import { Button } from "../Button/button";

export interface ContactListProps {
    content: Contact | Contact[];
}

export class ContactList extends Block {
  constructor(props: ContactListProps) {
    super("div", props);
  }

  render() {
    if (this.props.chats && this.props.chats.length > 0) {
      this.children.content = this.props.chats?.map((chat: ContactProps, i: number) => new Contact({
        btnDelete: new Button({
          isBasket: true,
          events: {
            click: (event) => {
              event.stopPropagation();
              this.props.deleteChatCb(chat.id);
              this.props.selectedChat = 0;
            },
          },
        }),
        selected: this.props.selectedChat === chat.id,
        id: chat.id,
        title: chat.title,
        avatar: chat.avatar ? `${BASE_URL}/resources${chat.avatar}`
          : defaultUserPhoto,
        unread_count: chat.unread_count,
        isCount: chat.unread_count > 0,
        last_message: {
          user: "",
          time: stringifyDate(chat?.last_message?.time),
          content: chat?.last_message?.content,
        },
        events: {
          click: () => {
            if (this.children.content[i].props.selected === false) {
              this.children.content[i].setProps({ selected: true });
              actions.selectChat(chat.id);
              this.props.callback();
              actions.getChatTitle(chat.title);
            }
          },
        },
      }));
    }
    return this.compile(template, { ...this.props });
  }
}
