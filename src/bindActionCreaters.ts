import { ActionCreaters, ActionCreater, Dispatch } from './types';

function bindActionCreater(actionCreater: ActionCreater, dispatch: Dispatch) {
  return (...args: unknown[]) => {
    dispatch(actionCreater(...args));
  };
}

export default function bindActionCreaters(actionCreaters: ActionCreaters, dispatch: Dispatch) {
  if (typeof actionCreaters === 'function') {
    return bindActionCreater(actionCreaters, dispatch);
  }
  if (typeof actionCreaters === 'object') {
    return Object.keys(actionCreaters).reduce(
      (pre, key) => {
        const action = actionCreaters[key];
        if (typeof action === 'function') {
          pre[key] = bindActionCreater(action, dispatch);
        }
        return pre;
      },
      {} as { [prop: string]: (...args: unknown[]) => void }
    );
  }
}
