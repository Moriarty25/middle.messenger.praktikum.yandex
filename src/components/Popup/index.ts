import connect from "../../store/connect";
import { Popup } from "./popup";

function mapUserToProps(state: any) {
  return {
    state,
  };
}

export default connect(mapUserToProps)(Popup);
