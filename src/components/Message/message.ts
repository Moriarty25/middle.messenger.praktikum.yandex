import "./message.scss";
import template from "./message.hbs";


const message = (props = {}): string => {
  return template(props);
};

export default message;
