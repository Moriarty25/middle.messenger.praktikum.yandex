import { Fieldset } from "../components/Fieldset/fieldset";


export function onValidate(
    event: FocusEvent,
    pathToBuilder: Fieldset,
    validateCallback: (text: string)=> string
  ) {
    const text = (event.target as HTMLInputElement).value;
    pathToBuilder.setProps({
      message: validateCallback(text),
    });
    return text;  
  }


export function validateLogin(login: string ): string {
    if (!login) return "Введите логин";
    else if (login.length < 3) return "Логин должен состоять минимум из 3-х символов";
    else if (login.length > 20) return "Логин не должен превышать 20 символов";
    else if (/\s/i.test(login)) return "Логин не должен содержать пробелы";
    else if (/^[\d]{3,20}$/i.test(login)) return "Логин не должен состоять только из цифр";
    else if (!/^[\d\w-]{3,20}$/i.test(login)) return "Логин должен быть на латинице и не содержать спецсимволов";
    else return "";
}


export function validatePassword(password: string ): string {
    if (!password) return "Введите пароль";
    else if (password.length < 8) return "Пароль должен состоять минимум из 8-ми символов";
    else if (password.length > 40) return "Пароль не должен превышать 40 символов";
    else if (!/([A-ZА-Я])/.test(password)) return "Пароль должен содержать хотя бы одну заглавную букву";
    else if (!/[\d]/.test(password)) return "Пароль должен содержать хотя бы одну цифру";
    else return "";
}


export function validateEmail(email: string ): string {
    if (!email) return "Введите почту";
    else if (/\s/i.test(email)) return "Почта не должна содержать пробелы";
    else if (/[А-Яа-я]/i.test(email)) return "Почта должна быть на латинице";
    else if (!/[@]/i.test(email)) return "Почта должна содержать символ @";
    else if (!/^.+@[A-Z]+\..+$/i.test(email)) return "Некорректный адрес электронной почты"
    else return "";
} 


export function validateFirstName(firstName: string ): string {
    if (!firstName) return "Введите имя";
    else if (/[0-9]/i.test(firstName)) return "Имя не должно содержать цифры";
    else if (!/^[A-ZА-Я]{1}.{0,}/.test(firstName)) return "Первая буква должна быть заглавной";
    else if (!/^[A-ZА-Я]{1}[-A-Za-zа-яА-я]{0,}$/.test(firstName)) return "Не должно быть спецсимволов и пробелов";
    else return "";
  }

  
export function validateSecondName(secondName: string ): string {
    if (!secondName) return "Введите фамилию";
    else if (/[0-9]/i.test(secondName)) return "Фамилия не должна содержать цифры";
    else if (!/^[A-ZА-Я]{1}.{0,}/.test(secondName)) return "Первая буква должна быть заглавной";
    else if (!/^[A-ZА-Я]{1}[-A-Za-zа-яА-я]{0,}$/.test(secondName)) return "Не должно быть спецсимволов и пробелов";
    else return "";
  }

  
export function validatePhone(phone: string ): string {
    if (!phone) return "Введите телефон";
    else if (phone.length < 10) return "Телефон должен состоять минимум из 10 символов";
    else if (phone.length > 15) return "Телефон не должен превышать 15 символов";
    else if (/\s/i.test(phone)) return "Телефон не должен содержать пробелы";
    else if (!/^\+{0,1}[\d]{9,}$/i.test(phone)) return "Некорректный телефонный номер";
    else return "";
  }


  
