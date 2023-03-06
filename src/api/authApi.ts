import { HTTPTransport } from "../utils/HTTPTransport";
import { BaseAPI } from "./baseApi";

export interface RegisterFormData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginFormData {
  login: string;
  password: string;
}

const authAPIInstance = new HTTPTransport("/auth");

class AuthAPI extends BaseAPI {
  signUp(data: RegisterFormData) {
    return authAPIInstance.post("/signup", { data });
  }

  signIn(data: LoginFormData) {
    return authAPIInstance.post("/signin", { data });
  }

  getUserInfo() {
    return authAPIInstance.get("/user");
  }

  logout() {
    return authAPIInstance.post("/logout");
  }
}

export const authAPI = new AuthAPI();
