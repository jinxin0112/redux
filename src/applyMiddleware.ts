import { Reducer, State } from './types';
import compose from './compose';

export default function applyMiddleware(...middlewares: any[]) {
  return (createStore: any) => (reducer: Reducer, preloadState: State) => {
    const store = createStore(reducer, preloadState);

    let dispatch: any = () => {
      throw new Error('middleware error');
    };

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...arg: any[]) => dispatch(...arg)
    };

    const chian = middlewares.map(middleware => middleware(middlewareAPI));

    dispatch = compose(...chian)(store.dispatch);

    return { ...store, dispatch };
  };
}
