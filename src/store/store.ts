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
  private state: Indexed = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
