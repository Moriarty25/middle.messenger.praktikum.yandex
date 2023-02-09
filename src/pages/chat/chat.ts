import { Tooltip } from "../../components/Tooltip/tooltip";
import defaultUserPhoto from "../../../static/defaultUserPhoto.png";
import { Contact } from "../../components/Contact/contact";
import { Date } from "../../components/Date/date";
import { Message } from "../../components/Message/message";
import Block from "../../utils/Block";
import template from "./chat.hbs";
import "./chat.scss";
import { Button } from "../../components/Button/button";
import { router } from "../../router/router";

interface ChatProps {
  defaultUserPhoto: string;
  contactArea: Array<Contact>;
  messageArea: Array<Message>;
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const pageBuilder = {

  defaultUserPhoto,
  me: new Message({
    isOwner: true,
  }),
  buttonProfile: new Button({
    isProfile: true,
    events: {
      click: (event) => {
        event.preventDefault();
        router.go("/profile");
      },
    },
  }),
  buttonSend: new Button({
    isSend: true,
  }),
  buttonMenu: new Button({
    isMenu: true,
    events: {
      mouseenter: () => {
        pageBuilder.headTooltip.show();
      },
      click: () => {
        if (pageBuilder.headTooltip.element?.style.display === "none") {
          pageBuilder.headTooltip.show();
        } else pageBuilder.headTooltip.hide();
      },
    },
  }),
  buttonAttachment: new Button({
    isAttachment: true,
    events: {
      mouseenter: () => {
        pageBuilder.footTooltip.show();
      },
      click: () => {
        if (pageBuilder.footTooltip.element?.style.display === "none") {
          pageBuilder.footTooltip.show();
        } else pageBuilder.footTooltip.hide();
      },
    },
  }),
  headTooltip:
    new Tooltip({
      headTooltip: true,
      events: {
        mouseleave: () => {
          pageBuilder.headTooltip.hide();
        },
      },
    }),
  footTooltip:
    new Tooltip({
      events: {
        mouseleave: () => {
          pageBuilder.footTooltip.hide();
        },
      },
    }),
  date: new Date({
    content: "4 декабря",
  }),
  contactArea: [],
  messageArea: [],
};

const resultMessageArea: Array<Message> = [];
for (let i = 0; i < 5; i++) {
  resultMessageArea.push(
    new Message({}),
  );
}
(pageBuilder.messageArea as Message[]) = resultMessageArea;

const resultContactArea: Array<Contact> = [];
for (let i = 0; i < 10; i++) {
  resultContactArea.push(new Contact({
    id: i,
    title: "",
    avatar: defaultUserPhoto,
    unread_count: 4,
    last_message: {
      user: "",
      time: "10:48",
      content: "Изображение",
    },
    events: {
      click: () => {
        // resultContactArea[i].setProps({
        //   selected: true
        // })
      },
    },
  }));
}
(pageBuilder.contactArea as Contact[]) = resultContactArea;
(pageBuilder.messageArea as Message[]) = [
  ...pageBuilder.messageArea,
  new Date({ content: "22 декабря" }),
  new Message({ isOwner: true }),
];

export const chatPage = new Chat(pageBuilder);
