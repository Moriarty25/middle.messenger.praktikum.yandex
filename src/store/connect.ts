/* eslint-disable func-names */
import Block from "../utils/Block";
import isEqual from "../utils/isEqual";
import store, { Indexed, StoreEvents } from "./store";

function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: any) {
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        });
      }
    };
  };
}

export const withUser = connect((state) => ({ user: state.user }));
export const withChats = connect((state) => ({ chats: state.chats }));

export default connect;
