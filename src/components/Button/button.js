import template from "./button.hbs";
import "./button.scss";

const button = (props = {}) => {
  return template(props);
};

export default button;
