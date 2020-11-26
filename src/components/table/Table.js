import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize, isCell, nextSelector, matrix} from '@/components/table/table.functions';
import TableSelection from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static classname = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }


  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="0:0"]'));
    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', text => {
      this.selection.current.text(text);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell.text());
  }

  toHtml() {
    return createTable(20);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      switch (event.shiftKey) {
        case true:
          const $cells = matrix($target, this.selection.current)
              .map(id => this.$root.find(`[data-id="${id}"]`));
          this.selection.selectGroup($cells);
          break;
        case false:
          this.selection.select($target);
          this.$emit('table:select', $target.text());
          break;
      }
    }
  }

  onKeydown(event) {
    const keys = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'Tab', 'Enter'];
    const {key, shiftKey} = event;

    if (keys.includes(key) && !shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);

      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target).text())
  }
}

