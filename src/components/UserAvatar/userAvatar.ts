import template from "./userAvatar.hbs";
// import "./profile.scss";
// import defaultUserPhoto from "../../../static/defaultUserPhoto.png";
import Block from "../../utils/Block";

interface userAvatarProps {
    // defaultUserPhoto: string;
    avatar: string;
    events?: {
        change?: (event: Event) => void;
    }
}

export class UserAvatar extends Block {
  constructor(props: userAvatarProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
