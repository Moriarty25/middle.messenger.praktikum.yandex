import { authAPI } from "../api/authApi";
import store from "./store";

export function signupContoller(data: any) {
  authAPI.signUp(data)?.then((response: any) => {
    if (response.status === 200) {
      authAPI.getUserInfo()?.then((response: any) => {
        if (response.status === 200) {
          authAPI.getUserInfo()?.then((response: any) => {
            store.set("user", JSON.parse(response.response));
          });
        }
        console.log(store);
      });
    } else console.log("errorrrrr");
  });
}

const getUserState = () => {
  const state = store.getState();
  const user = state.user ?? {};

  return {
    _data: [],
    _times: [],
    ...user,
  };
};

export const addUserData = (add: any) => {
  const user = getUserState();
  user._data.push(add);
  user._times.push(new Date().toString());

  store.set("user", user);
};
