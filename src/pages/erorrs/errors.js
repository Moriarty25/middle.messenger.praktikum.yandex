import template from './erorrs.hbs';
import './erorrs.scss';

const error = ({ title, message, link }) => {
  return template({ title, message, link });
};

export default error;
