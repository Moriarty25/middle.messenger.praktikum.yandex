import Block from "../../utils/Block";
import template from "./input.hbs";
import "./input.scss";

const input = (props = {}) => {
  return template(props);
};
export default input;

interface InputProps {
  inputType?: string;
  inputName?: string;
  inputPlaceholder?: string;
  message?: string;
  labelName?: string;
  invalid?: boolean;
  passwordInvalid?: boolean;
  events?: {
    click?: () => void;
  };
}

export class Input extends Block {
  constructor(props: InputProps) {
    super('div', props)
  }

  render() {
    return this.compile(template, {...this.props}) 
  } 
}
