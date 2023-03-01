/* eslint-disable no-shadow */
import EventBus from "../utils/EventBus";
import set from "../utils/set";

export type Indexed<T = unknown> = {
    [key in string]: T
  }

export enum StoreEvents {
  Updated = "updated",
  EVENT_UPDATE = "EVENT_UPDATE"
}

export type storeUserType = {
    id: number;
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    display_name: string;
    avatar: string;
}

type storeDialogType = {
    owner: string;
    text: string;
    time: string;

}

type storeChatType = {
    id: number;
    title: string;
    avatar: string;
}

export type storeDataType = {
    user?: storeUserType;
    foundUsers?: Indexed;
    name?: string;
    selectedChat?: number;
    token?: {
      token: string;
    };
    socket?: WebSocket;
    chats?: {[key: number]: storeChatType};
    dialog?: {
      [x: string]: any;[key: number]: storeDialogType
};
    currentChatId?: number;
    searchedUserId?: number;
} & Indexed;

class Store extends EventBus {
  static STORE_NAME = "myAppStore";

  static _instance: any;

  static EVENT_UPDATE: any = "updated";

  private state: Indexed = {};

  constructor() {
    if (Store._instance) return Store._instance;

    super();
  }

  public getState(): storeDataType {
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
