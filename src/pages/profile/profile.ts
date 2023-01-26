import { Button } from "../../components/Button/button";
import Block from "../../utils/Block";
import template from "./profile.hbs";
import "./profile.scss";

const profile = (props = {}) => {
  return template(props);
};

export default profile;

interface ProfileProps {
  defaultUserPhoto?: string;
  buttonBack: Button;
  firstName?: string;
  changePassword?: boolean;
  buttonPrimary?: Button;
  changeUserData?: boolean;
  profile?: boolean;
  UserData: UserData;
}

interface UserData {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string | number;
  changeData: Button;
  changePassword: Button;
  exit: Button;
  
}

export class Profile extends Block {
  constructor(props: ProfileProps) {
    super('div', props)
  }

  render() {
    
    return this.compile (template, {...this.props})
  } 
}
