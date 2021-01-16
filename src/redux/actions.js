import {APPLY_STYLE, CHANGE_TABLE_NAME, CHANGE_TEXT, CURRENT_STYLES, TABLE_RESIZE} from '@/redux/types';

export const tableResize = (data) => ({type: TABLE_RESIZE, data});
export const changeText = (data) => ({type: CHANGE_TEXT, data});
export const changeTableName = (value) => ({type: CHANGE_TABLE_NAME, data: value});
export const changeStyles = (data) => ({type: CURRENT_STYLES, data})
export const applyStyle = (data) => ({type: APPLY_STYLE, data})

