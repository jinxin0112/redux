export type Reducer<S = any, A extends Action = AnyAction> = (state: S | undefined, action: A) => S;

export type Enhancer<T> = (createStore: T) => T;

export interface Action<T = any> {
  type: T;
}

export interface AnyAction extends Action {
  [prop: string]: any;
}

export interface ActionCreator<A extends Action = AnyAction> {
  (...arg: any[]): A;
}

export interface ActionCreatorsMapObject {
  [key: string]: ActionCreator;
}

export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): T;
}

export type State =
  | {
      [prop: string]: any;
    }
  | undefined;

export type StoreCreator = <S, A extends Action, Ext, StateExt>(
  reducer: Reducer<S, A>,
  enhancer?: StoreEnhancer
) => Store<S & StateExt> & Ext;
//   <S, A extends Action, Ext, StateExt>(
//     reducer: Reducer<S, A>,
//     preloadState?: DeepPartal<S>,
//     enhancer?: StoreEnhancer<Ext>
//   ): Store<S & StateExt> & Ext;
// }

export type DeepPartal<S> = { [K in keyof S]?: S[K] extends object ? DeepPartal<S[K]> : S[K] };

export interface Store<S = any, A extends Action = AnyAction> {
  getState(): S;
  subscribe(listener: () => void): Unsubcribe;
  dispatch: Dispatch<A>;
}

export interface Unsubcribe {
  (): void;
}

export type StoreEnhancer<T = any> = (next: T) => T;

export type StoreEnhancerStoreCreator<Ext = {}, StateExt = {}> = <
  S = any,
  A extends Action = AnyAction
>() => Store<S & StateExt, A> & Ext;
