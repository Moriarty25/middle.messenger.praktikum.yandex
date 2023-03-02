import connect from "../../store/connect";
import { storeDataType } from "../../store/store";
import Block from "../../utils/Block";
import { SearchList } from "./searchList";

function mapUserToProps(state: storeDataType) {
  return {
    searchedUsers: state?.searchedUser,
    chatUsers: state?.chatUsers,
  };
}

export default connect(mapUserToProps)((SearchList as unknown as typeof Block));
