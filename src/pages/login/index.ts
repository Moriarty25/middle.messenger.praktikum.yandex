import { Login } from "./login";
import connect from "../../store/connect";
import Block from "../../utils/Block";

export default connect((state) => ({ user: state.user }))((Login as unknown as typeof Block));
