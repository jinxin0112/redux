import { ActionCreatorsMapObject, ActionCreator, Dispatch } from './types';

function bindActionCreater(ActionCreator: ActionCreator, dispatch: Dispatch) {
  return (...args: unknown[]) => {
    dispatch(ActionCreator(...args));
  };
}

export default function bindActionCreaters(actionCreators: ActionCreatorsMapObject, dispatch: Dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreater(actionCreators, dispatch);
  }
  if (typeof actionCreators === 'object') {
    return Object.keys(actionCreators).reduce(
      (pre, key) => {
        const action = actionCreators[key];
        if (typeof action === 'function') {
          pre[key] = bindActionCreater(action, dispatch);
        }
        return pre;
      },
      {} as { [prop: string]: (...args: unknown[]) => void }
    );
  }
}
