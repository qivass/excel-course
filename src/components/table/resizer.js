import {$} from '@core/dom';

export const resizer = (event, $rootEl) => {
  if (event.target.dataset.resize) {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const cellId = $parent.data.col;
    const cells = $rootEl.findAll(`[data-col="${cellId}"]`);
    const type = $resizer.data.resize;
    const sideProp = type === 'col'
      ? {resizerSide: 'bottom', resizerPos: 'right', parentProp: 'width'}
      : {resizerSide: 'right', resizerPos: 'bottom', parentProp: 'height'};
    let value;
    $resizer.css({[sideProp.resizerSide]: '-5000px', opacity: '1'});


    document.onmousemove = e => {
      let delta;
      if (type === 'col') {
        delta = e.pageX - coords.right;
        value = coords.width + delta;
      } else {
        delta = e.pageY - coords.bottom;
        value = coords.height + delta;
      }
      $resizer.css({[sideProp.resizerPos]: `${-delta}px`});
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      $resizer.removeAttr('style');
      if (type === 'col') {
        cells.forEach(el => el.style.width = value + 'px');
      }
      $parent.css({[sideProp.parentProp]: `${value}px`});
    }
  }
}
