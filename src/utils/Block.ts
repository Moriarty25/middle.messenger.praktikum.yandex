import { v4 as uuidv4 } from "uuid";
import EventBus from "./EventBus";

export default abstract class Block<Props extends Record<string, any> = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  public id = uuidv4();

  private _element: HTMLElement | null = null;

  private _meta: Record<any, string> | null = null;

  protected props: Props;

  protected children: Record<string, any>;

  protected eventBus: () => EventBus;

  /**
   * JSDoc
   * @param {string} tagName
   * @param {Object} propsWithChildren
   * @returns {void}
   */
  constructor(tagName: string | undefined = "div", propsWithChildren: any = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this._meta = {
      tagName,
      props,
    };

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildrenAndProps(childrenAndProps: any) {
    const props: any = {};
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every((v) => (v instanceof Block))) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    if (!this._meta) return;

    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  protected componentDidUpdate(_oldProps: Record<any, any>, _newProps: Record<any, any>): boolean {
    return true;
  }

  setProps = (nextProps: Record<any, any>) => {
    if (!nextProps) return;

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();

    let newElement: HTMLElement;

    if (block.children.length > 1) {
      newElement = document.createElement("div");
    } else {
      newElement = block.firstElementChild as HTMLElement;
    }

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
      this._element.innerHTML = "";
      this._element = newElement;
    } else {
      this._element = newElement;
    }

    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: any) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName: string): any {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков

    return document.createElement(tagName);
  }

  protected _removeEvents() {
    const { events = {} } = this.props as { events?: Record<string, ()=> void> };

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
            this._element!.removeEventListener(event, listener);
    });
  }

  protected _addEvents() {
    const { events = {} } = this.props as { events?: Record<string, ()=> void> };

    if (!events) {
      return;
    }

    Object.keys(events).forEach((eventsName) => {
            this._element!.addEventListener(eventsName, events[eventsName]);
    });
  }

  protected compile(template: (context: any) => string, context: any) : DocumentFragment {
    const propsAndStubs = { ...context };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((i) => `<div data-id="id-${i.id}"> </div>`);
      } else { propsAndStubs[key] = `<div data-id="id-${child.id}"> </div>`; }
    });

    const html = template(propsAndStubs);

    const temp = this._createDocumentElement("template");

    temp.innerHTML = html;

    Object.entries(this.children).forEach(([, child]) => {
      if (Array.isArray(child)) {
        child.forEach((i) => {
          const stub = temp.content.querySelector(`[data-id="id-${i.id}"]`);
          if (!stub) { return; }
          stub.replaceWith(i.getContent() as Node);
        });
      } else {
        const stub = temp.content.querySelector(`[data-id="id-${child.id}"]`);

        if (!stub) { return; }

        stub.replaceWith(child.getContent() as Node);
      }
    });

    return temp.content;
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}
