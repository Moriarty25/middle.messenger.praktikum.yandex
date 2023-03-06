import Block from "../../utils/Block";
import template from "./Placeholder.hbs";

export class Placeholder extends Block {
  constructor(props: {}) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
