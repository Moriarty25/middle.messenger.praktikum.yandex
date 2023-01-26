import template from "./contact.hbs";
import "./contact.scss";
import { Contact as ContactProps } from '../../types/chatPage';
import Block from "../../utils/Block";


const contact = (props: ContactProps): string => {
  return template(props);
};

export default contact;

export class Contact extends Block {
  constructor(props: ContactProps) {
    super('div', props)
  }

  render() {
    return this.compile(template, {...this.props}) 
  } 
}
