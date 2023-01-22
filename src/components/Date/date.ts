import "./date.scss";
import template from "./date.hbs";


const date = (props = {}): string => {
  return template(props);
};

export default date;
