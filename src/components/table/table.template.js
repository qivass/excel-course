import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

const CODES = {
  A: 65,
  Z: 90
};

// eslint-disable-next-line no-unused-vars
const DEFAULT_WIDTH = 120;
// eslint-disable-next-line no-unused-vars
const DEFAULT_HEIGHT = 24;

function getSize(styles = {}, index, side = 'width') {
  const varName = side === 'width' ? DEFAULT_WIDTH : DEFAULT_HEIGHT;
  return (styles[index] || varName) + 'px';
}

function toCell(row, colState, dataState, stylesState) {
  return function(__, col ) {
    const id = `${row}:${col}`;
    const data = dataState[id] || '';
    const styles = toInlineStyles(stylesState[id] || defaultStyles);
    return `<div 
                class="cell" 
                style="${styles}; width: ${getSize(colState, col)}"
                contenteditable 
                data-value="${data || ''}"
                data-col="${col}" 
                data-id="${id}">   
                ${parse(data)}           
            </div>`;
  }
}

function toColumn(colsStyles) {
  return function(col, index) {
    return `<div 
                class="column"
                style="width: ${getSize(colsStyles, index)}" 
                data-type="resizable" 
                data-col="${index}"
                >
            <span>${col}</span>
            <div class="col-resize" data-resize="col">
           </div>
          </div>`;
  }
}
function createRow(index = '', content, rowStyles) {
  const resize = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : '';
  const id = index ? index : '';
  return `
    <div 
        class="row" 
        style="height: ${getSize(rowStyles, index, 'height')}"
        data-type="resizable"
        style="height: ${rowStyles}"
        data-row="${id}"
        >
        <div class="row-info">
            ${id}
            ${resize}
        </div>
        <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15, state) {
  const {
    colState = {},
    rowState = {},
    dataState = {},
    stylesState = {},
  } = state;
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn(colState))
      .join('');

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, colState, dataState, stylesState))
        .join('');

    rows.push(createRow(row+1, cells, rowState));
  }

  return rows.join('');
}
