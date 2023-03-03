import connect from "../../store/connect";
import { storeDataType } from "../../store/store";
import Block from "../../utils/Block";
import { Popup } from "./popup";

function mapUserToProps(state: storeDataType) {
  return {
    chatUser: state?.chatUser,
    searchedUsers: state?.searchedUser,
    searchedUserId: state?.searchedUserId,
  };
}

export default connect(mapUserToProps)((Popup as unknown as typeof Block));
