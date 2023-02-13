/* eslint-disable no-shadow */
import EventBus from "../utils/EventBus";
import set from "../utils/set";

export type Indexed<T = unknown> = {
    [key in string]: T
  }

export enum StoreEvents {
    Updated = "updated",
  }

class Store extends EventBus {
  static STORE_NAME = "myAppStore";

  static _instance: any;

  static EVENT_UPDATE: any = 1;

  private state: Indexed = {};

  constructor() {
    if (Store._instance) return Store._instance;

    super();

    const savedState = localStorage.getItem(Store.STORE_NAME);

    this.state = savedState ? JSON.parse(savedState) ?? {} : {};

    Store._instance = this;

    this.on(Store.EVENT_UPDATE, () => {
      localStorage.setItem(Store.STORE_NAME, JSON.stringify(this.state));
    });
  }

  public getState() {
    return this.state;
  }

  removeState() {
    this.state = {};
    this.emit(Store.EVENT_UPDATE);
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
