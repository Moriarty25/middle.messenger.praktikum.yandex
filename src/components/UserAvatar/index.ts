import connect from "../../store/connect";
import { UserAvatar } from "./userAvatar";

function mapAvatarToProps(state: any) {
  return {
    avatar: state.user?.avatar
      ? `https://ya-praktikum.tech/api/v2/resources${state.user.avatar}`
      : "",
  };
}

export default connect(mapAvatarToProps)(UserAvatar);
