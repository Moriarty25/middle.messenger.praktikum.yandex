import connect from "../../store/connect";
import { DialogList } from "./dialogList";

function mapUserToProps(state: any) {
  return {
    chats: state?.chats,
  };
}

export default connect(mapUserToProps)(DialogList);
