import "./listItem.scss";
import template from "./listItem.hbs";
import Block from "../../utils/Block";
import { Button } from "../Button/button";

export interface ListItemProps {
  content?: string;
  btnDelete?: Button;
  events?: {
    click?: () => void;
  };
}

export class ListItem extends Block {
  constructor(props: ListItemProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
