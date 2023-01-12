import template from './profile.hbs';
import './profile.scss';

const profile = (props = {}, photo) => {
    return template(props, photo)
}

export default profile