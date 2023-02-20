import connect from "../../store/connect";
import { Fieldset } from "./fieldset";

function mapUserToProps(state: any) {
  return {
    login: state.user?.login,
    email: state.user?.email,
    first_name: state.user?.first_name,
    second_name: state.user?.second_name,
    display_name: state.user?.display_name ? state.user.display_name : "",
    phone: state.user?.phone,
  };
}

export default connect(mapUserToProps)(Fieldset);
