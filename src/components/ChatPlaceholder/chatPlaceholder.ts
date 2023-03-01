import Block from "../../utils/Block";
import template from "./ChatPlaceholder.hbs";

export class ChatPlaceholder extends Block {
  constructor(props: {}) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
