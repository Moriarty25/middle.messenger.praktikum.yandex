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

const authAPIInstance = new HTTPTransport("https://ya-praktikum.tech/api/v2");

class AuthAPI extends BaseAPI {
  signUp(data: RegisterFormData) {
    return authAPIInstance.post("/auth/signup", { data });
  }

  signIn(data: LoginFormData) {
    return authAPIInstance.post("/auth/signin", { data });
  }

  getUserInfo() {
    return authAPIInstance.get("/auth/user");
  }

  logout() {
    return authAPIInstance.post("/auth/logout");
  }
}

export const authAPI = new AuthAPI();
