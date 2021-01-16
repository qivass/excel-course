import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);

    this.name = options.name || '';
    this.store = options.store;
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.unsubscribers = [];
    this.storeSub = null;
    this.prepare();
  }


  // Настраиваем компонент до init
  prepare() {

  }

  // Возвращает шаблон компонента
  toHtml() {
    return ''
  }

  // Уведомляем слушали про обытия event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Подписываемся на содбытия event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  $getState() {
    return this.store.getState();
  }

  // Приходят изменение полей на которые мы подписаны
  storeChanged() {

  }


  isWatching(key) {
    return this.subscribe.includes(key);
  }

  // Ирициализируем компонет
  // Добавляем DOM слушатели
  init() {
    this.initDOMListeners()
  }

  // чистим DOM слушатели
  destroy() {
    this.removeDOMListeners();

    this.unsubscribers.forEach(unsub => unsub());
  }
}
