import { Login } from './login';
import connect from "../../store/connect";


export default connect(
    Login,
    state => {
        state.form ?? {'fa'}
    }
)
