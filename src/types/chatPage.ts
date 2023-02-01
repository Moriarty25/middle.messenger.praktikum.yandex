export interface User {
    first_name: string;
    second_name: string;
    avatar: string;
    email: string;
    login: string;
    phone: string;
  }

export interface LastMessage {
    user: User | string;
    time: Date | string;
    content: string;
  }

export interface Contact {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: LastMessage;
    events : {
      click: (event?: Event) => void
    }
  }
