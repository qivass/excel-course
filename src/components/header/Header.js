import {ExcelComponent} from '@core/ExcelComponent';
import {changeTableName} from '@/redux/actions';
import {debounce} from '@core/utils';

export class Header extends ExcelComponent {
  static classname = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      subscribe: ['tableName'],
      ...options
    });
  }

  init() {
    super.init();
    this.$tableName = this.$root.find('#table-name');
    const state = this.$getState();
    this.$tableName.text(state.tableName);
  }

  storeChanged({tableName}) {
    this.$tableName.text(tableName);
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  onInput(event) {
    this.$dispatch(changeTableName(event.target.value))
  }

  toHtml() {
    return `
           <input type="text" class="input" id="table-name"/>
           <div>
                <div class="button">
                    <span class="material-icons">
                        delete
                    </span>
                </div>
                <div class="button">
                    <span class="material-icons">
                        exit_to_app
                    </span>
                </div>
            </div>`
  }
}
