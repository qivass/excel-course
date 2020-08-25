import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static classname = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    });
  }

  toHtml() {
    return `
          <div class="info">fx</div>
          <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    console.log(this.$root);
    console.log('onInput formula', event.target.textContent.trim())
  }

  onClick(event) {
    console.log('onClick formula', event);
  }
}
