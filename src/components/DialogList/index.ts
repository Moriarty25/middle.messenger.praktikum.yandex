import connect from "../../store/connect";
import { storeDataType } from "../../store/store";
import Block from "../../utils/Block";
import { DialogList } from "./dialogList";

function mapUserToProps(state: storeDataType) {
  return {
    chats: state?.chats,
    dialog: state?.dialog,

  };
}

export default connect(mapUserToProps)((DialogList as unknown as typeof Block));
