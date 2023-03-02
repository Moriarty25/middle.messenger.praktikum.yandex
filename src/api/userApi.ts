import { HTTPTransport } from "../utils/HTTPTransport";
import { BaseAPI } from "./baseApi";
import {
  GetUserByIDData, SearchByLoginData, User, UserPassword,
} from "../types/user";

const userAPIInstance = new HTTPTransport("/user");

class UserAPI extends BaseAPI {
  changeUserProfile(data: User) {
    return userAPIInstance.put("/profile", { data });
  }

  changePassword(data: UserPassword) {
    return userAPIInstance.put("/password", { data });
  }

  changeAvatar(data: FormData) {
    return userAPIInstance.put("/profile/avatar", { data });
  }

  searchUserByLogin(data: SearchByLoginData) {
    return userAPIInstance.post("/search", { data });
  }

  getUserByID(id: GetUserByIDData) {
    return userAPIInstance.get(`/${id}`);
  }
}

export const userAPI = new UserAPI();
