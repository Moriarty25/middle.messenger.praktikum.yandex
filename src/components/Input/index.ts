import connect from "../../store/connect";
import { storeDataType } from "../../store/store";
import Block from "../../utils/Block";
import { Input } from "./input";

function mapUserToProps(state: storeDataType) {
  return {
    login: state.user?.login,
    email: state.user?.email,
    first_name: state.user?.first_name,
    second_name: state.user?.second_name,
    display_name: state.user?.display_name ? state.user.display_name : "",
    avatar: state.user?.avatar,
    phone: state.user?.phone,
    // value: state.user?.phone,
  };
}

export default connect(mapUserToProps)((Input as unknown as typeof Block));
