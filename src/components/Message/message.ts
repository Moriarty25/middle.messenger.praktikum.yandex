import "./message.scss";
import template from "./message.hbs";
import Block from "../../utils/Block";


const message = (props = {}): string => {
  return template(props);
};

export default message;

interface MessageProps {
  text?: string;
  events?: {
    click?: () => void;
  };
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super('div', props)
  }

  render() {
    return this.compile(template, {...this.props}) 
  } 
}
