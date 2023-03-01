import template from "./chatPlaceholder.hbs";
import Block from "../../utils/Block";

export class ChatPlaceholder extends Block {
  constructor(props: {}) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
