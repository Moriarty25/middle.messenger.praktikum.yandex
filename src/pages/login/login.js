import template from "./login.hbs";
import "./login.scss";
import input from "../../components/Input/input";

const login = (props = {}) => {
  return template(props);
};

export default login;
