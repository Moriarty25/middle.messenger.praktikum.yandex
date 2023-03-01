export interface User {
    first_name?: string;
    second_name?: string;
    avatar?: string;
    email?: string;
    login?: string;
    phone?: string;
    password?: string;
  }

export interface UserPassword {
    oldPassword: string,
    newPassword: string
  }

export interface SearchByLoginData {
  login: string;
}

export interface GetUserByIDData {
  id: number;
}
