import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizer} from '@/components/table/resizer';

export class Table extends ExcelComponent {
  static classname = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mousemove', 'mouseup']
    });
  }

  onMousedown(event) {
    resizer(event, this.$root);
  }

  onMousemove(event) {

  }

  onMouseup(event) {

  }


  toHtml() {
    return createTable(20);
  }
}

// 0 msLoading
// 57 msScripting
// 52 msRendering
// 37 msPainting
