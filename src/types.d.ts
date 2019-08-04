export type Reducer<T> = (state: T, type: string) => T;

export type Enhancer = () => void;

export interface Action {
  type: string;
  payload: any;
}

export interface AnyAction extends Action {
  [prop: string]: any;
}

export type ActionCreater = (...arg: any[]) => AnyAction;

export interface ActionCreaters {
  [prop: string]: ActionCreater;
}

export type Dispatch = (action: AnyAction) => void;
