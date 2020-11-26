import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  static classname = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    });
  }

  init() {
    super.init();
    this.$formula = this.$root.find('#formula');
    this.$on('table:select', text => this.$formula.text(text));
    this.$on('table:input', text => this.$formula.text(text));
  }

  toHtml() {
    return `
          <div class="info">fx</div>
          <div class="input" id="formula" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];

    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}
