import { Input } from "../Input/input";
import Block from "../../utils/Block";
import template from "./fieldset.hbs";
import "./fieldset.scss";

interface FieldsetProps {
  input: Input;
  inputType?: string;
  inputName?: string;
  inputPlaceholder?: string;
  message?: string;
  labelName?: string;
  invalid?: boolean;
  passwordInvalid?: boolean;
  isChangingPage?: boolean;
  events?: {
    click?: () => void;
    focus?: () => void;
  };
}

export class Fieldset extends Block {
  constructor(props: FieldsetProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
