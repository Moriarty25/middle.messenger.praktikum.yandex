import { Signin } from "./signnin";
import connect from "../../store/connect";
import Block from "../../utils/Block";

export default connect((state) => ({ user: state.user }))((Signin as unknown as typeof Block));
