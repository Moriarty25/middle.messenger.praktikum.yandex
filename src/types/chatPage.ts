import { User } from "./user";

export interface LastMessage {
    user: User | string;
    time: Date | string;
    content: string;
  }

export interface Contact {
    selected: boolean;
    id: number;
    title: string;
    avatar?: string;
    unread_count: number;
    last_message?: LastMessage;
    events : {
      click: (event?: Event) => void
    }
  }

export interface CreateChat {
    title: string;
}

export type getChatParamers = {
  offset?: number,
  limit?: number,
  title?: string
}
