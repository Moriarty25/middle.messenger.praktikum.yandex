import template from "./searchList.hbs";
import Block from "../../utils/Block";
import { Message } from "../Message/message";
import { Date } from "../Date/date";
import { ListItem } from "../ListItem/listItem";
import { Button } from "../Button/button";

interface DialogListProps {
    content: Message | Message[] | Date | Date[];
}

interface ListItemProps {
  first_name: string;
  second_name: string;
  time: string;
  id: number | string;
}

export class SearchList extends Block {
  constructor(props: DialogListProps) {
    super("div", props);
  }

  render() {
    if (this.props?.chatUsers) {
      this.children.content = this.props.chatUsers?.map((item: ListItemProps) => new ListItem({
        content: `${item.first_name} ${item.second_name}`,
        btnDelete: new Button({
          isBasket: true,
          events: {
            click: () => {
              this.props.callback(item.id);
            },
          },
        }),
      }));
    }

    return this.compile(template, { ...this.props });
  }
}
