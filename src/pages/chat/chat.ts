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
import { Input } from "../../components/Input/input";
import { ChatPlaceholder } from "../../components/ChatPlaceholder/chatPlaceholder";
import ContactList from "../../components/ContactList";
import DialogList from "../../components/DialogList";
import Popup from "../../components/Popup";
import Fieldset from "../../components/Fieldset";
import SearchList from "../../components/SearchList";
import { debounce } from "../../utils/debounce";
import { Navigation } from "../../components/Nav/navigation";

interface ChatProps {
  defaultUserPhoto: string;
  contactArea: Array<Contact>;
  messageArea: Array<Message>;
}

export class Chat extends Block {
  newChatTitle: string;

  addUserInDialog: string;

  activeChat: number | undefined;

  newMessage: string | null;

  constructor(props: ChatProps) {
    super("div", props);
    this.props.defaultUserPhoto = defaultUserPhoto;
    this.newChatTitle = "";
    this.addUserInDialog = "";
    this.newMessage = null;
  }

  cleanInputAfterSend() {
    this.newMessage = null;
    (document.querySelector("[name=message]") as HTMLInputElement).value = "";
  }

  protected init(): void {
    this.children.buttonProfile = new Button({
      isProfile: true,
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/settings");
        },
      },
    });

    this.children.buttonSend = new Button({
      isSend: true,
      events: {
        click: () => {
          if (this.newMessage) {
            Actions.sendMessage(this.newMessage);
          }
          this.cleanInputAfterSend();
        },
      },
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
            this.children.popup = new Popup({
              isAddUserPopup: true,
              name: "Добавить пользователя",
              events: {
                click: (event: { target: HTMLInputElement }) => {
                  if (
                    (event.target as HTMLInputElement).className
                    === "popup__body"
                  ) {
                    this.props.popupIsActive = false;
                  }
                },
              },
              inputLogin: new Fieldset({
                input: new Input({
                  inputType: "text",
                  inputName: "login",
                  inputPlaceholder: "Логин",
                  events: {
                    input: (event: { target: HTMLInputElement }) => {
                      this.addUserInDialog = (
                        event.target as HTMLInputElement
                      )?.value;
                      const searchUser = () => {
                        Actions.searchUserController({
                          login: this.addUserInDialog,
                        });
                      };
                      debounce(searchUser, 300)();
                    },
                  },
                }),
                labelName: "Логин",
                invalid: true,
                message: "",
              }),
              addUserBtn: new Button({
                isPrimary: true,
                name: "Добавить",
                events: {
                  click: (event) => {
                    event.preventDefault();
                    Actions.addUsersInChat({
                      users: [this.props.searchedUserId],
                      chatId: this.props?.selectedChat,
                    });
                    this.props.popupIsActive = false;
                  },
                },
              }),
            });
            this.props.popupIsActive = true;
          },
        },
      }),
      deleteUser: new Button({
        isDeleteUser: true,
        events: {
          click: () => {
            Actions.getChatUsers(this.props.selectedChat);
            this.children.popup = new Popup({
              callback: (id: number) => {
                Actions.deleteUserFromchat({
                  users: [id],
                  chatId: this.props?.selectedChat,
                });
                this.props.popupIsActive = false;
              },
              name: "Удалить пользователя",
              serchedUsers: new SearchList({}),
              events: {
                click: (event: { target: HTMLInputElement }) => {
                  if (event.target.className === "popup__body") {
                    // this.children.popup.hide();
                    this.props.popupIsActive = false;
                  }
                },
              },
              inputLogin: new Fieldset({
                input: new Input({
                  inputType: "text",
                  inputName: "login",
                  inputPlaceholder: "Логин",
                  events: {
                    input: (event: { target: HTMLInputElement }) => {
                      this.addUserInDialog = event.target?.value;
                      Actions.searchUserController({
                        login: this.addUserInDialog,
                      });
                      this.children.popup.show();
                    },
                  },
                }),
                labelName: "Логин",
                invalid: true,
                message: "",
              }),
              addUserBtn: new Button({
                isPrimary: true,
                name: "Закрыть",
                events: {
                  click: (event) => {
                    event.preventDefault();
                    this.props.popupIsActive = false;
                  },
                },
              }),
            });
            this.props.popupIsActive = true;
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
          change: (event: { target: HTMLInputElement }) => {
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
          },
        },
      }),
    });

    this.children.date = new Date({
      content: "4 декабря",
    });

    this.children.inputMessenger = new Input({
      isMessage: true,
      events: {
        input: (event: { target: HTMLInputElement }) => {
          const message = (event.target as HTMLInputElement).value;
          this.newMessage = message;
        },
      },
    });

    this.children.chats = new ContactList({
      callback: () => {
        this.props.chatIsActive = true;
        Actions.createDialogSocketController({
          chatId: this.props?.selectedChat,
        });
        Actions.startDialogController(
          this.props?.user?.id,
          this.props?.selectedChat,
        );
      },
    });

    this.children.placeholder = new ChatPlaceholder({});
    this.children.dialog = new DialogList({});
    this.props.chatIsActive = false;
    if (this.props?.selectedChat) {
      this.props.chatIsActive = true;
    }
    this.children.nav = new Navigation({});
  }

  componentDidMount(): void {
    Actions.getUserController();
    Actions.getChatscontroller();
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
