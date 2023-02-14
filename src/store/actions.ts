import { chatPage } from './../pages/chat/chat';
import { authAPI } from "../api/authApi";
import { router } from "../router/router";
import store from "./store";

function signupContoller(data: any) {
  authAPI.signUp(data)?.then((response: any) => {
    if (response.status === 200) {
      if (response.status === 200) {
        authAPI.getUserInfo()?.then((response: any) => {
          store.set("user", JSON.parse(response.response));
          console.log(JSON.parse(response.response));
        });
      } else console.log("errorrrrr");
      console.log(store);
    }
  });
}

function getUserController() {
  authAPI.getUserInfo()?.then((response: any) => {
  store.set("user", JSON.parse(response.response));
    console.log(JSON.parse(response.response));
  }).then(() => {  console.log(store.getState(), 'dwqdqw')
  return user = store.getState().user
});
}

function loginController(data: any) {
  authAPI.signIn(data)?.then((response: any) => {
    if (response.status === 200) {
      if (response.status === 200) {
        authAPI.getUserInfo()?.then((response: any) => {
          store.set("user", JSON.parse(response.response));
          console.log(JSON.parse(response.response));
        });
      } else console.log("errorrrrr");
      console.log(store);
    } else {
      getUserController();
      router.go("/");
    }
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

const getFormState = () => {

	const 	state= store.getState(),
			form = state.form ?? {};

	return Object.assign(
		{ 
			text : '',
			_lines: [],
			_times: []
		},
		form
	);
}

const explodeText = text => {
	return text.split("\n").map(i => i.trim());
}

export const addText = add => {

	const 	form  = getFormState(),
			_lines= explodeText(add),
			_times= (Array(_lines.length)).fill((new Date()).toString());

	form._lines = form._lines.concat(_lines);
	form._times = form._times.concat(_times);
	form.text = form._lines.join("\n");

	store.set('form', form);
}

export default { signupContoller, getUserController, loginController };
