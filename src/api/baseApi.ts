export class BaseAPI {
  // Если забыть переопределить метод и использовать его, — выстрелит ошибка
  create() {
    throw new Error("Not implemented");
  }

  request() {
    throw new Error("Not implemented");
  }

  update() {
    throw new Error("Not implemented");
  }

  delete() {
    throw new Error("Not implemented");
  }
}
