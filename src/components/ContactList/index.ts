import connect from "../../store/connect";
import { storeDataType } from "../../store/store";
import Block from "../../utils/Block";
import { ContactList } from "./contactList";

function mapUserToProps(state: storeDataType) {
  return {
    chats: state?.chats,
    selectedChat: state.selectedChat,
  };
}

export default connect(mapUserToProps)((ContactList as unknown as typeof Block));
