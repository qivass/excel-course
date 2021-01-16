import {APPLY_STYLE, CHANGE_TABLE_NAME, CHANGE_TEXT, CURRENT_STYLES, TABLE_RESIZE} from '@/redux/types';
import {storage} from '@core/utils';
import {defaultStyles} from '@/constants';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {}, // {'0:1' : 'какой то текст по умолчанию'}
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: '',
  tableName: 'Новая таблица',
};

const state = storage('excel-state');
export const initialState = state ? state : defaultState;

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE:
      const key = action.data.type === 'col' ? 'colState' : 'rowState';
      return {
        ...state,
        [key]: {...state[key], ...{[action.data.id]: action.data.value}},
      };
    case CHANGE_TEXT:
      return {
        ...state,
        currentText: action.data.value,
        dataState: {...state.dataState, ...{[action.data.id]: action.data.value}},
      };
    case CHANGE_TABLE_NAME:
      return {
        ...state,
        tableName: action.data
      };
    case CURRENT_STYLES:
      return {
        ...state,
        currentStyles: action.data,
      };
    case APPLY_STYLE:
      const {ids, value} = action.data;
      const val = state.stylesState || {};
      ids.forEach(id => val[id] = {...val[id], ...value});
      return {
        ...state,
        stylesState: val,
        currentStyles: {...state.currentStyles, ...value}
      }

    default: return state;
  }
}
