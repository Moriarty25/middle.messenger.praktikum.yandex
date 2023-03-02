import { HTTPTransport } from "../utils/HTTPTransport";
import { BaseAPI } from "./baseApi";
import {
  AddChatUserData, CreateChat, DeleteChatUserData, getChatParamers, getChatToken, getChatUserData,
} from "../types/chatPage";

const chatAPIInstance = new HTTPTransport("/chats");

class UserAPI extends BaseAPI {
  createChat(data: CreateChat) {
    return chatAPIInstance.post("", { data });
  }

  getChat(data?: getChatParamers) {
    return chatAPIInstance.get("", { data });
  }

  addUser(data: AddChatUserData) {
    return chatAPIInstance.put("/users", { data });
  }

  getToken(id: getChatToken) {
    return chatAPIInstance.post(`/token/${id}`);
  }

  getChatUsers(id: getChatUserData) {
    return chatAPIInstance.get(`/${id}/users`);
  }

  deleteUser(data: DeleteChatUserData) {
    return chatAPIInstance.delete("/users", { data });
  }
}

export const chatAPI = new UserAPI();
