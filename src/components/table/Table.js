import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static classname = 'excel__table';

  toHtml() {
    return createTable(20);
  }
}
