import template from "./popup.hbs";
import "./popup.scss";
import Block from "../../utils/Block";
import { Fieldset } from "../Fieldset/fieldset";
import { Button } from "../Button/button";

interface PopupProps {
    // defaultUserPhoto: string;
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
    return this.compile(template, { ...this.props });
  }
}
