import template from "./contact.hbs";
import "./contact.scss";
import { Contact } from '../../types/chatPage';


const contact = (props: Contact): string => {
  return template(props);
};

export default contact;
