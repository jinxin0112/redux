type Reducer = (state: any, type: string) => void;

type Enhancer = () => void;

interface Action {
  type: string;
  payload: any;
}

interface AnyAction extends Action {
  [prop: string]: any;
}

export default function createStore<T extends any>(
  reducer: Reducer,
  preloadedState: T,
  enhancer: Enhancer
) {
  if (typeof reducer !== 'function') {
    throw new Error('Expected reducer to be a function.');
  }

  let currentReducer: Reducer = reducer;
  let currentState: T = preloadedState;
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

  function dispatch(action: Action) {
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
      currentReducer(currentState, action.type);
    } catch (error) {
      isDispatching = false;
    }

    const listeners = (currentListeners = nextListeners);
    listeners.forEach(listener => listener());
    return action;
  }

  return {
    getState,
    dispatch,
    subscribe
  };
}
