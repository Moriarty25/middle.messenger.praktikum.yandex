// import { router } from './../../router/router';
/* eslint-disable no-new */
import { Chat } from "./chat";
import connect from "../../store/connect";
import { storeDataType } from "../../store/store";
import Block from "../../utils/Block";

export default connect((state: storeDataType) => ({
  user: state.user,

  chats: state.chats,

  dialog: state.dialog,

  name: state.name,

  searchedUserId: state.searchedUserId,

  selectedChat: state.selectedChat,

  token: state.token,
}))((Chat as unknown as typeof Block));
