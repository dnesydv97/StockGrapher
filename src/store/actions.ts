import {SET, RESET, UPDATE, RESET_REDUX} from './constants';
import initialState from './initialState';
interface ConfigProps {
  id?: string;
  order?: 'asc' | 'desc';
}
export function set(key: keyof typeof initialState, data: any) {
  return {
    type: SET,
    data,
    key,
  };
}

export function reset(key: keyof typeof initialState) {
  return {
    type: RESET,
    data: null,
    key,
  };
}

export function update(key: keyof typeof initialState, data: any, config?: ConfigProps) {
  return {
    type: UPDATE,
    data,
    key,
    config,
  };
}

export function resetRedux() {
  return {
    type: RESET_REDUX,
  };
}
