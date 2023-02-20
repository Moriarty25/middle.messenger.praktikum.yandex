import connect from "../../store/connect";
import { ContactList } from "./contactList";

function mapUserToProps(state: any) {
  return {
    chats: state?.chats,
  };
}

export default connect(mapUserToProps)(ContactList);
