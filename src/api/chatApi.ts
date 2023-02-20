import { HTTPTransport } from "../utils/HTTPTransport";
import { BaseAPI } from "./baseApi";
import { CreateChat, getChatParamers } from "../types/chatPage";

const chatAPIInstance = new HTTPTransport("https://ya-praktikum.tech/api/v2");

class UserAPI extends BaseAPI {
  createChat(data: CreateChat) {
    return chatAPIInstance.post("/chats", { data });
  }

  getChat(data?: getChatParamers) {
    return chatAPIInstance.get("/chats", { data });
  }
}

export const chatAPI = new UserAPI();
