import { Fieldset } from "../components/Fieldset/fieldset";

export function onValidate(
  event: FocusEvent,
  pathToBuilder: Fieldset,
  validateCallback: (text: string) => string,
) {
  const text = (event.target as HTMLInputElement).value;
  pathToBuilder.setProps({
    message: validateCallback(text),
  });
  return text;
}

export function validateLogin(login: string | undefined): string {
  if (!login) return "Введите логин";
  if (login.length < 3) return "Логин должен состоять минимум из 3-х символов";
  if (login.length > 20) return "Логин не должен превышать 20 символов";
  if (/\s/i.test(login)) return "Логин не должен содержать пробелы";
  if (/^[\d]{3,20}$/i.test(login)) return "Логин не должен состоять только из цифр";
  if (!/^[\d\w-]{3,20}$/i.test(login)) {
    return "Логин должен быть на латинице и не содержать спецсимволов";
  }
  return "";
}

export function validatePassword(password: string| undefined): string {
  if (!password) return "Введите пароль";
  if (password.length < 8) return "Пароль должен состоять минимум из 8-ми символов";
  if (password.length > 40) return "Пароль не должен превышать 40 символов";
  if (!/([A-ZА-Я])/.test(password)) return "Пароль должен содержать хотя бы одну заглавную букву";
  if (!/[\d]/.test(password)) return "Пароль должен содержать хотя бы одну цифру";
  return "";
}

export function validateEmail(email: string | undefined): string {
  if (!email) return "Введите почту";
  if (/\s/i.test(email)) return "Почта не должна содержать пробелы";
  if (/[А-Яа-я]/i.test(email)) return "Почта должна быть на латинице";
  if (!/[@]/i.test(email)) return "Почта должна содержать символ @";
  if (!/^.+@[A-Z]+\..+$/i.test(email)) return "Некорректный адрес электронной почты";
  return "";
}

export function validateFirstName(firstName: string| undefined): string {
  if (!firstName) return "Введите имя";
  if (/[0-9]/i.test(firstName)) return "Имя не должно содержать цифры";
  if (!/^[A-ZА-Я]{1}.{0,}/.test(firstName)) return "Первая буква должна быть заглавной";
  if (!/^[A-ZА-Я]{1}[-A-Za-zа-яА-я]{0,}$/.test(firstName)) {
    return "Не должно быть спецсимволов и пробелов";
  }
  return "";
}

export function validateSecondName(secondName: string| undefined): string {
  if (!secondName) return "Введите фамилию";
  if (/[0-9]/i.test(secondName)) return "Фамилия не должна содержать цифры";
  if (!/^[A-ZА-Я]{1}.{0,}/.test(secondName)) return "Первая буква должна быть заглавной";
  if (!/^[A-ZА-Я]{1}[-A-Za-zа-яА-я]{0,}$/.test(secondName)) {
    return "Не должно быть спецсимволов и пробелов";
  }
  return "";
}

export function validatePhone(phone: string| undefined): string {
  if (!phone) return "Введите телефон";
  if (phone.length < 10) return "Телефон должен состоять минимум из 10 символов";
  if (phone.length > 15) return "Телефон не должен превышать 15 символов";
  if (/\s/i.test(phone)) return "Телефон не должен содержать пробелы";
  if (!/^\+{0,1}[\d]{9,}$/i.test(phone)) return "Некорректный телефонный номер";
  return "";
}

export function onSubmitvalidationSignin(
  event: MouseEvent,
  state: any,
  // stateLogin: string,
  // stateEmail: string,
  // stateFirstName: string,
  // stateSecondName: string,
  // statePhone: string,
  // statePassword: string,
  // statePasswordAgain: string,
  builderLogin: Fieldset,
  builderEmail: Fieldset,
  builerFirstName: Fieldset,
  builderSecondName: Fieldset,
  builderPhone: Fieldset,
  builderPassword: Fieldset,
  builderPasswordAgain: Fieldset,
) {
  event.preventDefault();
  // document.querySelector('[name=login]').focus()
  if (
    state.formRegistration.password !== state.formRegistration.passwordAgain
  ) {
    builderPasswordAgain.setProps({
      message: "Пароли не совпадают",
    });
  } else if (
    validateLogin(state.formRegistration.login) === ""
    && validateEmail(state.formRegistration.email) === ""
    && validateFirstName(state.formRegistration.first_name) === ""
    && validateSecondName(state.formRegistration.second_name) === ""
    && validatePhone(state.formRegistration.phone) === ""
    && validatePassword(state.formRegistration.password) === ""
    && validatePassword(state.formRegistration.passwordAgain) === ""
  ) {
    // eslint-disable-next-line no-console
    console.log(state.formRegistration);
  } else {
    builderLogin.setProps({
      message: validateLogin(state.formRegistration.login),
    });
    builderEmail.setProps({
      message: validateEmail(state.formRegistration.email),
    });
    builerFirstName.setProps({
      message: validateFirstName(state.formRegistration.first_name),
    });
    builderSecondName.setProps({
      message: validateSecondName(state.formRegistration.second_name),
    });
    builderPhone.setProps({
      message: validatePhone(state.formRegistration.phone),
    });
    builderPassword.setProps({
      message: validatePassword(state.formRegistration.password),
    });
    builderPasswordAgain.setProps({
      message: validatePassword(state.formRegistration.passwordAgain),
    });
  }
}
