import connect from "../../store/connect";
import Block from "../../utils/Block";
import { SearchList } from "./searchList";

function mapUserToProps(state: any) {
  return {
    searchedUsers: state?.searchedUser,
    chatUsers: state?.chatUsers,
  };
}

export default connect(mapUserToProps)((SearchList as unknown as typeof Block));
