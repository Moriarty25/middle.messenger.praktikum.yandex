type Handler = (...args: unknown[]) => void;
type BusEvent = string;

export default class EventBus {
  private listeners: Record<string, Array<Handler>>;

  constructor() {
    this.listeners = {};
  }

  on(event: BusEvent, callback: Handler) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: BusEvent, callback: Handler) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: BusEvent, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
