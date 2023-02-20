import { Signin } from "./signnin";
import connect from "../../store/connect";

export default connect((state) => ({ user: state.user }))(Signin);
