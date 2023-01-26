import "./date.scss";
import template from "./date.hbs";
import Block from "../../utils/Block";


const date = (props = {}): string => {
  return template(props);
};

export default date;

// export class Date extends Block {
//   constructor(props = {}) {
//     super (props);
//   }

//   render() {
//     return template(props)
//   }
// }

interface DateProps {
  content?: string;
  events?: {
    click?: () => void;
  };
}

export class Date extends Block {
  constructor(props: DateProps) {
    super('div', props)
  }

  render() {
    return this.compile(template, {...this.props}) 
  } 
}
