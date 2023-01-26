import { Button } from "../../components/Button/button";
import Block from "../../utils/Block";
import template from "./signin.hbs";
import "./signin.scss";

// const signin = (props = {}) => {
//   return template(props);
// };

// export default signin;


interface SigninProps {
  input: Input;
  button: Button;
}

interface Input {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  phone: string;
  password: string;
  passwordAgain: string;
}

export class Signin extends Block {
  constructor(props: SigninProps) {
    super('div', props)
  }

  render() {
    
    return this.compile (template, {...this.props})
  } 
}

const signin = (props: SigninProps) => {
  return new Signin(props )
}

export default signin
