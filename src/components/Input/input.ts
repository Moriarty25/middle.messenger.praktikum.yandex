import Block from "../../utils/Block";
import template from "./input.hbs";

interface InputProps {
  inputType?: string;
  inputName?: string;
  inputPlaceholder?: string;
  invalid?: boolean;
  passwordInvalid?: boolean;
  value?: string;
  events?: {
    click?: () => void;
    focus?: () => void;
    blur?: (event: FocusEvent) => void;
    input?: (event: InputEvent) => void;
  };
}

export class Input extends Block {
  constructor(props: InputProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
