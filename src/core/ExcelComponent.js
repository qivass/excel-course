import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);

    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];

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
