import connect from "../../store/connect";
import { Popup } from "./popup";

function mapUserToProps(state: any) {
  return {
    // state,
    chatUser: state?.chatUser,
    searchedUsers: state?.searchedUser,
    searchedUserId: state?.searchedUserId,
  };
}

export default connect(mapUserToProps)(Popup);
