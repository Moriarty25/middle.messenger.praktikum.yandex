/* eslint-disable no-console */
import { authAPI, LoginFormData, RegisterFormData } from "../api/authApi";
import { chatAPI } from "../api/chatApi";
import { userAPI } from "../api/userApi";
import { router } from "../router/router";
import {
  AddChatUserData,
  CreateChat,
  DeleteChatUserData,
  getChatToken,
  getChatUserData,
} from "../types/chatPage";
import { SearchByLoginData, User, UserPassword } from "../types/user";
import store, { StoreEvents } from "./store";

async function signupContoller(data: RegisterFormData) {
  return authAPI.signUp(data)?.then((response: XMLHttpRequest) => {
    if (response.status === 200) {
      if (response.status === 200) {
        authAPI.getUserInfo()?.then((response: XMLHttpRequest) => {
          store.set("user", JSON.parse(response.response));
          store.set("auth", true);
        }).catch((e) => console.log(e));
      }
    } else {
      const error = JSON.parse(response.response).reason;
      return error;
    }
    return "";
  }).catch((e) => console.log(e));
}

function getUserController() {
  authAPI.getUserInfo().then((response: XMLHttpRequest) => {
    const data = JSON.parse(response.response);
    store.set("user", data);
  }).catch((e) => console.log(e));
}

function loginController(data: LoginFormData): Promise<Record<string, unknown>> {
  return authAPI.signIn(data)?.then((response: XMLHttpRequest) => {
    if (response.status === 200) {
      if (response.status === 200) {
        authAPI.getUserInfo()?.then((response: XMLHttpRequest) => {
          store.set("user", JSON.parse(response.response));
          router.go("/messenger");
        }).catch((e) => console.log(e));
      }
    } else if (response.status === 400) {
      router.go("/messenger");
      const error = JSON.parse(response.response).reason;
      return error;
    } else {
      const error = JSON.parse(response.response).reason;
      return error;
    }
    return "";
  }).catch((e) => console.log(e));
}

function logoutController() {
  authAPI.getUserInfo()?.then((response: XMLHttpRequest) => {
    if (response.status === 200) {
      authAPI.logout()?.then(() => {
        if (store.getState().socket) {
          if (store.getState().socket) {
            store.getState().socket!.close();
          }
        }
        store.removeState();
      });
    }
  }).catch((e) => console.log(e));
  router.go("/");
}

function changeUserDataController(data: User) {
  userAPI.changeUserProfile(data)?.then((response: XMLHttpRequest) => {
    if (response.status === 200) {
      store.set("user", JSON.parse(response.response));
      router.go("/settings");
    } else {
      const error = JSON.parse(response.response).reason;
      console.log(error, "ERROR");
    }
  }).catch((e) => console.log(e));
}

function changeUserPasswordController(data: UserPassword) {
  return userAPI.changePassword(data)?.then((response: XMLHttpRequest) => {
    if (response.status === 200) {
      router.go("/settings");
    } else {
      const error = JSON.parse(response.response).reason;
      return error;
    }
    return "";
  }).catch((e) => console.log(e));
}

function changeAvatarController(data: FormData) {
  userAPI.changeAvatar(data)?.then((response: XMLHttpRequest) => {
    if (response.status === 200) {
      store.set("user", {
        ...store.getState().user,
        avatar: JSON.parse(response.response).avatar,
      });
    } else {
      const error = JSON.parse(response.response).reason;
      console.log(error);
    }
  }).catch((e) => console.log(e));
}

function createChatController(data: CreateChat) {
  chatAPI.createChat(data)?.then((response: XMLHttpRequest) => {
    if (response.status === 200) {
      chatAPI.getChat()?.then((response: XMLHttpRequest) => {
        store.set("chats", JSON.parse(response.response));
      });
    } else {
      const error = JSON.parse(response.response).reason;
      console.log(error);
    }
  }).catch((e) => console.log(e));
}

function getChatscontroller() {
  chatAPI.getChat()?.then((response: XMLHttpRequest) => {
    if (response.status === 200) {
      store.set("chats", JSON.parse(response.response));
    } else console.log(JSON.parse(response.response).reason);
  }).catch((e) => console.log(e));
}

function selectChat(id: number | null) {
  store.set("selectedChat", id);
}

function addUsersInChat(data: AddChatUserData) {
  chatAPI.addUser(data)?.then((response: XMLHttpRequest) => {
    if (response.status === 200) {
      console.log("Пользователь успешно добавлен");
    } else console.log(JSON.parse(response.response).reason);
  }).catch((e) => console.log(e));
}

function searchUserController(data: SearchByLoginData) {
  userAPI.searchUserByLogin(data)?.then((response: XMLHttpRequest) => {
    if (JSON.parse(response.response)[0]) {
      const userId = JSON.parse(response.response)[0].id;
      store.set("searchedUserId", JSON.parse(response.response)[0].id);
      userAPI.getUserByID(userId)?.then((response: XMLHttpRequest) => {
        store.set("searchedUser", JSON.parse(response.response).login);
      });
    } else console.log(JSON.parse(response.response).reason);
  }).catch((e) => console.log(e));
}

function createDialogSocketController(data: getChatToken) {
  chatAPI.getToken(data)?.then((response: XMLHttpRequest) => {
    store.set("token", JSON.parse(response.response));
  }).catch((e) => console.log(e));
}

function startDialogController(
  userId: number,
  chatId: getChatToken,
) {
  chatAPI
    .getToken(chatId)
    ?.then((response: XMLHttpRequest) => {
      store.set("token", JSON.parse(response.response));
    })
    .then(() => {
      const newToken = store.getState().token!.token;
      const socket = new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${newToken}`,
      );

      store.set("socket", socket);
      store.set("dialog", []);
      pingSocket();

      socket.addEventListener("open", () => {
        console.log("Соединение установлено");

        // socket.send(JSON.stringify({
        //   content: message,
        //   type: "message",
        // }));

        socket.send(
          JSON.stringify({
            content: "0",
            type: "get old",
          }),
        );
      });

      socket.addEventListener("close", (event) => {
        if (event.wasClean) {
          console.log("Соединение закрыто чисто");
        } else {
          console.log("Обрыв соединения");
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      });

      socket.addEventListener("message", (event) => {
        console.log("Получены данные", event.data);
        const result: Record<string, any> = [];
        try {
          let data = JSON.parse(event.data);
          if (!Array.isArray(data)) {
            data = [data];
          }
          const userId = store.getState().user!.id;
          data.forEach((message: Record<string, any>) => {
            if (message.type !== "user connected" && message.type !== "pong") {
              if (userId === message.user_id) {
                result.unshift({
                  text: message.content,
                  owner: "me",
                  time: message.time,
                });
              } else {
                result.unshift({
                  text: message.content,
                  owner: "friend",
                  time: message.time,
                });
              }
            }
          });
          store.getState().dialog = store.getState().dialog!.concat(result);
          store.emit(StoreEvents.Updated);
        } catch (e) {
          console.log(e);
        }
      });

      socket.addEventListener("error", (event) => {
        console.log("Ошибка", (event as {} as { message: string }).message);
      });
    }).catch((e) => console.log(e));
}

function sendMessage(message: string) {
  const { socket } = store.getState();
  try {
  socket!.send(
    JSON.stringify({
      content: message,
      type: "message",
    }),
  );
  } catch (e) {
    console.log(e);
  }
}

function pingSocket() {
  const { socket } = store.getState();
  const pingInterval = setInterval(() => {
    if (store.getState().socket === socket) {
      try {
      socket!.send(
        JSON.stringify({
          content: "",
          type: "ping",
        }),
      );
      } catch (e) {
        console.log(e);
      }
    } else {
      clearInterval(pingInterval);
    }
  }, 15000);
}

function getChatTitle(chatTitle: string) {
  store.set("name", chatTitle);
}

function getChatUsers(id: getChatUserData) {
  chatAPI.getChatUsers(id)?.then((response: XMLHttpRequest) => {
    store.set("chatUsers", JSON.parse(response.response));
  }).catch((e) => console.log(e));
}

function deleteUserFromchat(data: DeleteChatUserData) {
  chatAPI.deleteUser(data)?.then((response: XMLHttpRequest) => {
    if (response.status === 200) {
      console.log("Пользователь успешно удален");
    }
  }).catch((e) => console.log(e));
}

function deleteChat(data: getChatUserData) {
  chatAPI.deleteChat(data)?.then((response: XMLHttpRequest) => {
    if (response.status === 200) {
      console.log("Чат успешно удален");
      if (JSON.parse(response.response).result.id === store.getState().selectedChat) {
        store.getState().socket!.close();
        store.getState().selectedChat = 0;
        store.set("socket", "");
      }
      chatAPI.getChat()?.then((response: XMLHttpRequest) => {
        if (response.status === 200) {
          store.set("chats", JSON.parse(response.response));
        } else console.log(JSON.parse(response.response).reason);
      }).catch((e) => console.log(e));
    }
  }).catch((e) => console.log(e));
}

async function isUserAuthorized() {
  const user = await authAPI.getUserInfo();
  if (user.status === 200) {
    // store.set("auth", true);
  }
  if (user.status !== 200) {
    throw new Error("");
  }
}

export default {
  signupContoller,
  getUserController,
  loginController,
  logoutController,
  changeUserDataController,
  changeUserPasswordController,
  changeAvatarController,
  createChatController,
  getChatscontroller,
  selectChat,
  addUsersInChat,
  searchUserController,
  createDialogSocketController,
  startDialogController,
  sendMessage,
  getChatTitle,
  getChatUsers,
  deleteUserFromchat,
  deleteChat,
  isUserAuthorized,
};
