import connect from "../../store/connect";
import { storeDataType } from "../../store/store";
import Block from "../../utils/Block";
import { BASE_URL } from "../../utils/HTTPTransport";
import { UserAvatar } from "./userAvatar";

function mapAvatarToProps(state: storeDataType) {
  return {
    avatar: state.user?.avatar
      ? `${BASE_URL}/resources${state.user.avatar}`
      : "",
  };
}

export default connect(mapAvatarToProps)((UserAvatar as unknown as typeof Block));
