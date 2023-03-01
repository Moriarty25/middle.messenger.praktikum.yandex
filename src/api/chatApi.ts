import { HTTPTransport } from "../utils/HTTPTransport";
import { BaseAPI } from "./baseApi";
import {
  AddChatUserData, CreateChat, DeleteChatUserData, getChatParamers, getChatToken, getChatUserData,
} from "../types/chatPage";

const chatAPIInstance = new HTTPTransport("https://ya-praktikum.tech/api/v2");

class UserAPI extends BaseAPI {
  createChat(data: CreateChat) {
    return chatAPIInstance.post("/chats", { data });
  }

  getChat(data?: getChatParamers) {
    return chatAPIInstance.get("/chats", { data });
  }

  addUser(data: AddChatUserData) {
    return chatAPIInstance.put("/chats/users", { data });
  }

  getToken(id: getChatToken) {
    return chatAPIInstance.post(`/chats/token/${id}`);
  }

  getChatUsers(id: getChatUserData) {
    return chatAPIInstance.get(`/chats/${id}/users`);
  }

  deleteUser(data: DeleteChatUserData) {
    return chatAPIInstance.delete("/chats/users", { data });
  }
}

export const chatAPI = new UserAPI();
