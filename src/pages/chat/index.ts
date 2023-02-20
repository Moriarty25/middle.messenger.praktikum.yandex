import { Chat } from "./chat";
import connect from "../../store/connect";

export default connect((state) => ({
  user: state.user,
  chats: state.chats,
}))(Chat);
