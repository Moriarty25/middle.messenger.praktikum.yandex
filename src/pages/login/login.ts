import template from "./login.hbs";
import "./login.scss";
import { Button } from "../../components/Button/button";
import { Input } from './../../components/Input/input';
import Block from "../../utils/Block";

// const login = (props = {}) => {
//   return template(props);
// };

// export default login;



// const signin = (props = {}) => {
//   return template(props);
// };

// export default signin;


interface LoginProps {
  input: Input;
  button: Button;
}



export class Login extends Block {
  constructor(props: LoginProps) {
    super('div', props)
    console.log(props);
  }

  render() {
    
    return this.compile (template, {...this.props})
  } 
}
