import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize, isCell, nextSelector, matrix} from '@/components/table/table.functions';
import TableSelection from '@/components/table/TableSelection';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

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

    this.$on('formula:input', value => {
      const parsed = parse(value) || value;
      this.selection.current.attr('data-value', value)
      this.selection.current.text(parsed)
      this.updateTextInStore(value);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,
      }))
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles))
  }

  toHtml() {
    const state = this.$getState();
    return createTable(20, state);
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn('resize error', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event).then();
    } else if (isCell(event)) {
      const $target = $(event.target);
      switch (event.shiftKey) {
        case true:
          const $cells = matrix($target, this.selection.current)
              .map(id => this.$root.find(`[data-id="${id}"]`));
          this.selection.selectGroup($cells);
          break;
        case false:
          this.selectCell($target);
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }
}

