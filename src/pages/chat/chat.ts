import store, { StoreEvents } from "../../store/store";
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
import Actions from "../../store/actions";
import Input from "../../components/Input";
import ContactList from "../../components/ContactList";
import { ChatPlaceholder } from "../../components/ChatPlaceholder/chatPlaceholder";
import DialogList from "../../components/DialogList";
import Popup from "../../components/Popup";
import Fieldset from "../../components/Fieldset";

interface ChatProps {
  defaultUserPhoto: string;
  contactArea: Array<Contact>;
  messageArea: Array<Message>;
}

export class Chat extends Block {
  newChatTitle: string | null;

  activeChat: number | undefined;

  constructor(props: ChatProps) {
    super("div", props);
    this.props.defaultUserPhoto = defaultUserPhoto;
    this.newChatTitle = null;
  }

  protected init(): void {
    this.children.me = new Message({
      isOwner: true,
    });

    this.children.buttonProfile = new Button({
      isProfile: true,
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/profile");
        },
      },
    });

    this.children.buttonSend = new Button({
      isSend: true,
    });

    this.children.buttonMenu = new Button({
      isMenu: true,
      events: {
        mouseenter: () => {
          this.children.headTooltip.show();
        },
        click: () => {
          if (this.children.headTooltip.element?.style.display === "none") {
            this.children.headTooltip.show();
          } else this.children.headTooltip.hide();
        },
      },
    });

    this.children.buttonAttachment = new Button({
      isAttachment: true,
      events: {
        mouseenter: () => {
          this.children.footTooltip.show();
        },
        click: () => {
          if (this.children.footTooltip.element?.style.display === "none") {
            this.children.footTooltip.show();
          } else this.children.footTooltip.hide();
        },
      },
    });

    this.children.headTooltip = new Tooltip({
      headTooltip: true,
      addUser: new Button({
        isAddUser: true,
        events: {
          click: () => {
            if (this.children.popup.element?.style.display === "none") {
              this.children.popup.show();
            } else this.children.popup.hide();
          },
        },
      }),
      deleteUser: new Button({
        isDeleteUser: true,
        events: {
          click: () => {
            console.log("clicked");
          },
        },
      }),
      events: {
        mouseleave: () => {
          this.children.headTooltip.hide();
        },
      },
    });

    this.children.footTooltip = new Tooltip({
      events: {
        mouseleave: () => {
          this.children.footTooltip.hide();
        },
      },
    });

    this.children.buttonCreateChat = new Button({
      name: "Создать чат",
      isPrimary: true,
      events: {
        click: () => {
          if (
            this.children.createChattooltip.element?.style.display === "none"
          ) {
            this.children.createChattooltip.show();
            this.children.buttonCreateChat.setProps({ name: "Закрыть" });
          } else {
            this.children.createChattooltip.hide();
            this.children.buttonCreateChat.setProps({ name: "Создать чат" });
          }
        },
      },
    });

    this.children.createChattooltip = new Tooltip({
      inputCreateChat: new Input({
        inputName: "chatName",
        inputType: "text",
        inputPlaceholder: "Введите название нового чата",
        value: "",
        events: {
          change: (event) => {
            this.newChatTitle = event.target.value;
          },
        },
      }),
      createChatSend: new Button({
        isSend: true,
        events: {
          click: () => {
            const value = this.newChatTitle;
            Actions.createChatController({ title: value });
            if (arrChats) {
              this.children.chats.setProps({
                content: arrChats.unshift(new Contact({
                  title: value,
                  avatar: defaultUserPhoto,
                  unread_count: 0,
                })),
              });
            }
          },
        },
      }),
    });

    this.children.date = new Date({
      content: "4 декабря",
    });

    this.children.contactArea = [];
    this.children.messageArea = [];

    const arrChats = this.props.chats?.map((chat: Contact, i: number) => new Contact({
      selected: false,
      id: chat.id,
      title: chat.title,
      avatar: chat.avatar ? chat.avatar : defaultUserPhoto,
      unread_count: chat.unread_count,
      last_message: {
        user: "",
        time: "10:48",
        content: chat.content,
      },
      events: {
        click: () => {
          if (this.children.chats.children.content[i].props.selected === false) {
            this.children.chats.children.content[i].setProps({ selected: true });
            Actions.selectChat(chat.id);
            this.props.chatIsActive = true
            // router.use(`/chat/${chat.id}`)
            // router.go(`/chat/${chat.id}`)
          } else {
            this.children.chats.children.content[i].setProps({ selected: false });
            this.props.chatIsActive = false

          }
          // this.children.chats.children.content[i].setProps({ selected: false });
        },
      },
    }));

    // this.children.contactArea.forEach((item, i)=>{
    //   // return this.children.contactArea = arrChats?.[0]; 
    // })
    // this.setProps({contactArea: arrChats})
    // console.log(this.setProps({ contactArea: arrChats }));
    // this.children.contactsArr = arrChats
    // this.children.contactArea = [...this.children.contactArea, test[0]];

    this.children.chats = new ContactList({
      content: this.props.chats?.map((chat: Contact, i: number) => new Contact({
        selected: false,
        id: chat.id,
        title: chat.title,
        avatar: chat.avatar ? chat.avatar : defaultUserPhoto,
        unread_count: chat.unread_count,
        last_message: {
          user: "",
          time: "10:48",
          content: chat.content,
        },
        events: {
          click: () => {
            if (this.children.chats.children.content[i].props.selected === false) {
              this.children.chats.children.content[i].setProps({ selected: true });
              Actions.selectChat(chat.id);
              this.props.chatIsActive = true
              // router.use(`/chat/${chat.id}`)
              // router.go(`/chat/${chat.id}`)
            } else {
              this.children.chats.children.content[i].setProps({ selected: false });
              this.props.chatIsActive = false
  
            }
            // this.children.chats.children.content[i].setProps({ selected: false });
          },
        },
      })),
    });

    this.children.placeholder = new ChatPlaceholder({});
    this.children.dialog = new DialogList({
      content: [new Message({})],
    });
    this.props.chatIsActive = false;
    this.props.name = this.props?.chat?.title ?? "Беседа";

    this.children.popup = new Popup({
      name: "Добавить пользователя",
      events: {
        click: (event) => {
          if (event.target.className === "popup__body") {
            this.children.popup.hide();
          }
        },
      },
      inputLogin: new Fieldset({
        input: new Input({
          inputType: "text",
          inputName: "login",
          inputPlaceholder: "Логин",
          events: {
            blur: (event) => {
              // state.formAutorization.login = onValidate(
              //   event,
              //   this.children.login,
              //   validateLogin,
              // );
            },
          },
        }),
        labelName: "Логин",
        invalid: true,
        message: "",
      }),
      addUserBtn: new Button({
        isPrimary: true,
        name: "Add"
      }),
    });
  }

  componentDidMount(): void {
    Actions.getUserController();
    Actions.getChatscontroller();
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

// const pageBuilder = {

//   defaultUserPhoto,
//   me: new Message({
//     isOwner: true,
//   }),
//   buttonProfile: new Button({
//     isProfile: true,
//     events: {
//       click: (event) => {
//         event.preventDefault();
//         router.go("/profile");
//       },
//     },
//   }),
//   buttonSend: new Button({
//     isSend: true,
//   }),
//   buttonMenu: new Button({
//     isMenu: true,
//     events: {
//       mouseenter: () => {
//         pageBuilder.headTooltip.show();
//       },
//       click: () => {
//         if (pageBuilder.headTooltip.element?.style.display === "none") {
//           pageBuilder.headTooltip.show();
//         } else pageBuilder.headTooltip.hide();
//       },
//     },
//   }),
//   buttonAttachment: new Button({
//     isAttachment: true,
//     events: {
//       mouseenter: () => {
//         pageBuilder.footTooltip.show();
//       },
//       click: () => {
//         if (pageBuilder.footTooltip.element?.style.display === "none") {
//           pageBuilder.footTooltip.show();
//         } else pageBuilder.footTooltip.hide();
//       },
//     },
//   }),
//   headTooltip:
//     new Tooltip({
//       headTooltip: true,
//       events: {
//         mouseleave: () => {
//           pageBuilder.headTooltip.hide();
//         },
//       },
//     }),
//   footTooltip:
//     new Tooltip({
//       events: {
//         mouseleave: () => {
//           pageBuilder.footTooltip.hide();
//         },
//       },
//     }),
//   date: new Date({
//     content: "4 декабря",
//   }),
//   contactArea: [],
//   messageArea: [],
// };

// const resultMessageArea: Array<Message> = [];
// for (let i = 0; i < 5; i++) {
//   resultMessageArea.push(
//     new Message({}),
//   );
// }
// (pageBuilder.messageArea as Message[]) = resultMessageArea;

// const resultContactArea: Array<Contact> = [];
// for (let i = 0; i < 10; i++) {
//   resultContactArea.push(new Contact({
//     id: i,
//     title: "",
//     avatar: defaultUserPhoto,
//     unread_count: 4,
//     last_message: {
//       user: "",
//       time: "10:48",
//       content: "Изображение",
//     },
//     events: {
//       click: () => {
//         // resultContactArea[i].setProps({
//         //   selected: true
//         // })
//       },
//     },
//   }));
// }
// (pageBuilder.contactArea as Contact[]) = resultContactArea;
// (pageBuilder.messageArea as Message[]) = [
//   ...pageBuilder.messageArea,
//   new Date({ content: "22 декабря" }),
//   new Message({ isOwner: true }),
// ];

// export const chatPage = new Chat(pageBuilder);
