import { Reducer, AnyAction } from './types';

type Reducers = { [prop: string]: Reducer<any> };
type RootState = { [prop: string]: any };

export default function combineReducer(reducers: Reducers) {
  if (typeof combineReducer !== 'object' || combineReducer === null) return;

  const finalReducers = Object.keys(reducers)
    .filter(key => typeof reducers[key] === 'function')
    .reduce(
      (pre, cur) => {
        pre[cur] = reducers[cur];
        return pre;
      },
      {} as { [prop: string]: Reducer<any> }
    );

  return function rootReducer(state: RootState, action: AnyAction): RootState {
    let hasChange: boolean = false;
    let nextState: RootState = <RootState>{};
    Object.keys(finalReducers).reduce((pre, key) => {
      const reducer = finalReducers[key];
      const nextCurrentState = reducer(state[key], action);
      pre[key] = nextCurrentState;
      hasChange = hasChange || nextCurrentState !== state[key];
      return pre;
    }, nextState);
    return hasChange ? nextState : state;
  };
}
