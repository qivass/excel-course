export class Emitter {
  constructor() {
    this.listeners = {}
  }
  // уведомлять слушатели если они есть (trigger, dispatch)
  emit(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) return false;

    (this.listeners[eventName]).forEach(listener => {
      listener(...args)
    });

    return true;
  }
  // подписываемся на уведомления или добавляем слушатель
  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);

    return () => {
      this.listeners[eventName] =
            this.listeners[eventName].filter(listener => listener !== fn)
    }
  }
}

// Example
// const emitter = new Emitter();
//
// const unsub = emitter.subscribe('alexey', data => console.log('Sub:', data));
// emitter.emit('alexey', 42);
//
//
// setTimeout(() => {
//   unsub();
// }, 2000);
//
//
// setTimeout(() => {
//     emitter.emit('alexey', 'after 4 seconds');
// }, 2000);
