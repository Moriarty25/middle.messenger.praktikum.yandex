import { Button } from "../components/Button/button";
import { User } from "./user";

export interface LastMessage {
    user: User | string;
    time: string;
    content: string | undefined;
  }

export interface Contact {
    btnDelete?: Button;
    isCount?: boolean;
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

export interface AddChatUserData {
  users: number[],
  chatId: number
}

export interface DeleteChatUserData extends AddChatUserData {}

export interface getChatToken {
  chatId: number;
}

export interface getChatUserData extends getChatToken {}
