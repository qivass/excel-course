import {evaluate} from 'mathjs';

export function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      return evaluate(value.slice(1))
    } catch (e) {
      return value;
    }
  }
  return value;
}
