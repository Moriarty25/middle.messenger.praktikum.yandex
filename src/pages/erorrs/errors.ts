import { Button } from "../../components/Button/button";
import { router } from "../../router/router";
import { addText } from "../../store/actions";
import connect from "../../store/connect";
import store, { StoreEvents } from "../../store/store";
import Block from "../../utils/Block";
import template from "./erorrs.hbs";
import "./erorrs.scss";

interface ErrorProps {
  title: string;
  message: string;
  link: Button;
}

export class ErrorPage extends Block {
  constructor(props: ErrorProps) {
    super("div", props);

    // this.props[404] = {
    //   title: "404",
    //   message: "Вы не туда попали",
    //   link: new Button({
    //     name: "Назад к чатам",
    //     link: "/",
    //     events: {
    //       click: (event) => {
    //         event.preventDefault();
    //         router.go("/");
    //       },
    //     },
    //   }),
    // };

    this.props[500] = {
      title: "500",
      message: "Уже фиксим",
      link: new Button({
        name: "Назад к чатам",
        link: "/",
        events: {
          click: (event) => {
            event.preventDefault();
            // router.go("/");
        
                   // подписываемся на событие
      store.on(StoreEvents.Updated, () => {
        // вызываем обновление компонента, передав данные из хранилища
        // state[500].setProps(store.getState());
          });
          addText("text");
          },
        },
      }),
    };
  }

  init() {
   
    this.props.title = "404";
    this.props.message = "Вы не туда попали";
    //   title: "404",
    //   message: "Вы не туда попали",
    // };
    // this.props[500] = {
    //   title: "500",
    //   message: "Уже фиксим",
    // };

    this.children.link = new Button({
      name: "Назад к чатам",
      link: "/",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/");
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const state = {
  404: {
    title: "404",
    message: "Вы не туда попали",
    link: new Button({
      name: "Назад к чатам",
      link: "/",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/");
        },
      },
    }),
  },
  500: {
    title: "500",
    message: "Уже фиксим",
    link: new Button({
      name: "Назад к чатам",
      link: "/",
      events: {
        click: (event) => {
          event.preventDefault();
          // router.go("/");
      
                 // подписываемся на событие
    store.on(StoreEvents.Updated, () => {
      // вызываем обновление компонента, передав данные из хранилища
      // state[500].setProps(store.getState());
        });
        addText("text");
        },
      },
    }),
  },
};

export const errorPage500 = new ErrorPage(state[500]);
export const errorPage404 = new ErrorPage(state[404]);
// export default connect(mapUserToProps)(errorPage404);
