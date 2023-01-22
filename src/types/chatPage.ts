
export interface Contact {
    id:           number;
    title:        string;
    avatar:       string;
    unread_count: number;
    last_message: LastMessage;
  }
  
  
  export interface LastMessage {
    user:    User;
    time:    Date;
    content: string;
  }
  
  export interface User {
    first_name:  string;
    second_name: string;
    avatar:      string;
    email:       string;
    login:       string;
    phone:       string;
  }
  