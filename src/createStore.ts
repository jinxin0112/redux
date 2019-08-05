import { Reducer, Enhancer, AnyAction, State } from './types';
import ActionTypes from './utils/actionTypes';

type CreateStoreRes = {
  getState: () => State;
  dispatch: (action: AnyAction) => void;
  subscribe: (fn: any) => () => void;
};

export default function createStore(
  reducer: Reducer,
  preloadedState?: State,
  enhancer?: Enhancer<typeof createStore>
): CreateStoreRes {
  if (typeof reducer !== 'function') {
    throw new Error('Expected reducer to be a function.');
  }

  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, preloadedState);
  }

  let currentReducer: Reducer = reducer;
  let currentState: State = preloadedState;
  let currentListeners: any[] = [];
  let nextListeners: any[] = currentListeners;
  let isDispatching: boolean = false;

  function ensureCanMutateNextListeners() {
    if (currentListeners === nextListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  function getState() {
    return currentState;
  }
  function subscribe(listener: any) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }
    let isSubscribe = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribe) {
        return;
      }
      ensureCanMutateNextListeners();
      const index = nextListeners.indexOf(listener);
      nextListeners.slice(index, 1);
      currentListeners = [];
    };
  }

  function dispatch(action: AnyAction) {
    if (typeof action.type === 'undefined') {
      throw new Error(
        `Actions may not have an undefined "type" property.
         Have you misspelled a constant?`
      );
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } catch (error) {
      isDispatching = false;
    }

    const listeners = (currentListeners = nextListeners);
    listeners.forEach(listener => listener());
    return action;
  }

  // 初始化调用使currentState拿到reducer的初始值
  dispatch({
    type: ActionTypes.INIT
  });

  return {
    getState,
    dispatch,
    subscribe
  };
}
