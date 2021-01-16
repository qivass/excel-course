import {createToolbar} from '@/components/toolbar/toolbar.template';
import {$} from '@core/dom';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {defaultStyles} from '@/constants';

export class Toolbar extends ExcelStateComponent {
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }
  static classname = 'excel__toolbar';


  prepare() {
    this.initState(defaultStyles)
  }

  storeChanged({currentStyles}) {
    this.setState(currentStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHtml() {
    return this.template;
  }

  onClick(event) {
    const $target = $(event.target);
    $target.addClass('active');
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);
      this.setState(value);
    }
  }
}
