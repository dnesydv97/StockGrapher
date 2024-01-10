import {produce} from 'immer';
import {SET, UPDATE, RESET_REDUX} from './constants';
import initialState from './initialState';

const appReducer = (
  state: any = initialState,
  action: {
    key?: keyof typeof initialState;
    data?: any;
    type: string;
    config?: any;
  },
) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_REDUX:
        return initialState;
      case SET:
        if (action.data) {
          draft[action.key]['data'] = action.data.data;
          
        } else {
          draft[action.key] = action.data;
        }

        break;
      case UPDATE:
        if (!!action?.config?.id) {
          let updateState = [...(state[action.key]['data'] || state[action.key])];
          const findIndex = updateState?.findIndex((find: any) => find?._id === action?.config?.id);
          if (findIndex >= 0 && updateState[findIndex]) {
            updateState[findIndex] = {
              ...updateState[findIndex],
              ...action?.data,
            };
          } else {
            updateState = [...[action.data], ...updateState];
          }
          if (draft[action.key]['data']) {
            draft[action.key]['data'] = updateState;
          } else {
            draft[action.key] = updateState;
          }
        } else {
          if (Array.isArray(draft[action.key])) {
            draft[action.key] =
              action?.config?.order === 'desc'
                ? [...draft[action.key], action.data]
                : [action.data, ...draft[action.key]];
          } else if (typeof draft[action.key] === 'object') {
            if (draft[action.key]['data']) {
              draft[action.key]['data'] = [...draft[action.key]['data'], ...action.data.data];
             
            } else {
              draft[action.key] = {...draft[action.key], ...action.data};
            }
          }
        }

        break;
    }
  });

export default appReducer;
