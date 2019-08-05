export type Reducer = (state: State, action: AnyAction) => State;

export type Enhancer<T> = (createStore: T) => T;

export interface Action {
  type: string;
  payload?: any;
}

export interface AnyAction extends Action {
  [prop: string]: any;
}

export type ActionCreater = (...arg: any[]) => AnyAction;

export interface ActionCreaters {
  [prop: string]: ActionCreater;
}

export type Dispatch = (action: AnyAction) => void;

export type State =
  | {
      [prop: string]: any;
    }
  | undefined;
