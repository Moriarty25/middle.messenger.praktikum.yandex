/* eslint-disable no-console */
import { authAPI } from "../api/authApi";
import { chatAPI } from "../api/chatApi";
import { userAPI } from "../api/userApi";
import chat from "../pages/chat";
import { router } from "../router/router";
import { CreateChat } from "../types/chatPage";
import { User, UserPassword } from "../types/user";
import store from "./store";

function signupContoller(data: any) {
  authAPI.signUp(data)?.then((response: any) => {
    if (response.status === 200) {
      if (response.status === 200) {
        authAPI.getUserInfo()?.then((response: any) => {
          store.set("user", JSON.parse(response.response));
        });
      } else console.log("errorrrrr");
      console.log(store);
    }
  });
}

function getUserController() {
  authAPI
    .getUserInfo()
    ?.then((response: any) => {
      store.set("user", JSON.parse(response.response));
    });
}

function loginController(data: any) {
  authAPI.signIn(data)?.then((response: any) => {
    if (response.status === 200) {
      if (response.status === 200) {
        authAPI.getUserInfo()?.then((response: any) => {
          store.set("user", JSON.parse(response.response));
          console.log(JSON.parse(response.response));
          router.go("/");
        });
      } else console.log("errorrrrr");
      console.log(store);
    } else {
      getUserController();
      router.go("/");
    }
  });
}

function logoutController() {
  authAPI.getUserInfo()?.then((response: any) => {
    if (response.status === 200) {
      authAPI.logout()?.then(() => {
        if (
          store.getState().selectChat
          && store.getState().selectChat.socket
        ) {
          // закрываем сокет
          if (store.getState().selectChat.socket.readyState) {
            store.getState().selectChat.socket.close();
          }
        }
        store.removeState();
      });
    }
  });
  router.go("/login");
}

function changeUserDataController(data: User) {
  userAPI.changeUserProfile(data)?.then((response: any) => {
    if (response.status === 200) {
      store.set("user", JSON.parse(response.response));
      router.go("/profile");
    } else {
      const error = JSON.parse(response.response).reason;
      // errorTextLabel?.classList.add("invalid");
      console.log(error);
    }
  });
}

function changeUserPasswordController(data: UserPassword) {
  userAPI.changePassword(data)?.then((response: any) => {
    if (response.status === 200) {
      store.set("user", JSON.parse(response.response));
      router.go("/profile");
    } else {
      const error = JSON.parse(response.response).reason;
      console.log(error);
    }
  });
}

function changeAvatarController(data: FormData) {
  userAPI.changeAvatar(data)?.then((response: any) => {
    if (response.status === 200) {
      store.set("user", {
        ...store.getState().user,
        avatar: JSON.parse(response.response).avatar,
      });
    } else {
      const error = JSON.parse(response.response).reason;
      console.log(error);
    }
  });
}

function createChatController(data: CreateChat) {
  chatAPI.createChat(data)?.then((response: any) => {
    if (response.status === 200) {
      chatAPI.getChat()?.then((response: any) => {
        store.set("chats", JSON.parse(response.response));
      });
    } else {
      const error = JSON.parse(response.response).reason;
      console.log(error);
    }
  });
}

function getChatscontroller() {
  chatAPI.getChat()?.then((response: any) => {
    if (response.status === 200) {
      store.set("chats", JSON.parse(response.response));
    } else console.log(JSON.parse(response.response).reason);
  });
}

function selectChat(id: number | null) {
  store.set("selectedChat", id);
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
};
