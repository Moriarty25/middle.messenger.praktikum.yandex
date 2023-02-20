import { HTTPTransport } from "../utils/HTTPTransport";
import { BaseAPI } from "./baseApi";
import { User, UserPassword } from "../types/user";

const userAPIInstance = new HTTPTransport("https://ya-praktikum.tech/api/v2");

class UserAPI extends BaseAPI {
  changeUserProfile(data: User) {
    return userAPIInstance.put("/user/profile", { data });
  }

  changePassword(data: UserPassword) {
    return userAPIInstance.put("/user/password", { data });
  }

  changeAvatar(data: FormData) {
    return userAPIInstance.put("/user/profile/avatar", { data });
  }
}

export const userAPI = new UserAPI();
