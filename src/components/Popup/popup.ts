import template from "./popup.hbs";
import "./popup.scss";
import Block from "../../utils/Block";
import { Fieldset } from "../Fieldset/fieldset";
import { Button } from "../Button/button";
import SearchList from "../SearchList";

interface PopupProps {
    inputLogin: Fieldset;
    addUserBtn: Button;
    events?: {
        change?: (event: Event) => void;
    }
}

export class Popup extends Block {
  constructor(props: PopupProps) {
    super("div", props);
  }

  render() {
    this.children.chatUser = new SearchList({
      callback: this.props.callback,
    });

    return this.compile(template, { ...this.props });
  }
}
