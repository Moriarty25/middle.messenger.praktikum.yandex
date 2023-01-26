import Block from "../../utils/Block";
import template from "./chat.hbs";
import "./chat.scss";

const chat = (props = {}) => {
  return template(props);
};

export default chat;

interface ChatProps {
  defaultUserPhoto: string
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    super('div', props)
  }

  render() {
    
    return this.compile (template, {...this.props})
  } 
}
