import { Login } from "./login";
import connect from "../../store/connect";

export default connect((state) => ({ user: state.user }))(Login);
