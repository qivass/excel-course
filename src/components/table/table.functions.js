export const shouldResize = (event) => {
  return !!event.target.dataset.resize;
};

export const isCell = (event) => {
  return !!event.target.dataset.id;
};

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}

export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`));
    return acc;
  }, [])
}


export function nextSelector(key, id) {
  let {col, row} = id;
  const MIN_VALUE = 0;
  switch (key) {
    case 'ArrowUp':
      row--;
      break;
    case 'ArrowRight':
    case 'Tab':
      col++;
      break;
    case 'ArrowDown':
    case 'Enter':
      row++;
      break;
    case 'ArrowLeft':
      col--;
      break;
  }

  if (col < MIN_VALUE) col = MIN_VALUE;
  if (row < MIN_VALUE) row = MIN_VALUE;

  return `[data-id="${row}:${col}"]`;
}

