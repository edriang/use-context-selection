import React from 'react';

import isEqualShallow from './isShallowEqual';

let LISTENER_UID = 1;

type GetterFn = (state: any) => any;
type Listener = {
  getterFn: GetterFn;
  forceUpdate: Function;
};
type ContextListeners = Map<number, Listener>;

const contextListeners = new Map<React.Context<any>, ContextListeners>();

function createContextConsumer<T>(Context: React.Context<T>) {
  return ({ children, selector = (store: any) => store }: any) => {
    const contextValue = useContextSelection(Context, selector);

    return children(contextValue);
  };
}

function createContext<T>(initValue: any): React.Context<T> {
  // @ts-ignore
  const Context = React.createContext<T>(initValue, (oldValue: T, newValue: T) => {
    const listeners = contextListeners.get(Context);

    if (!listeners) {
      return 0;
    }

    for (const [, listener] of listeners) {
      const newResult = listener.getterFn(newValue);

      if (!isEqualShallow(newResult, listener.getterFn(oldValue))) {
        listener.forceUpdate(newResult);
      }
    }
    return 0;
  });

  // @ts-ignore
  Context.Consumer = createContextConsumer(Context);

  return Context;
}

function useContextSelection<T = any>(Context: React.Context<T>, getterFn: GetterFn): Partial<T> {
  const listenerID = React.useRef(LISTENER_UID++);
  const contextValue = React.useContext(Context);
  const [currentSelection, forceUpdate] = React.useState<any>(getterFn(contextValue));

  React.useEffect(() => {
    return () => {
      const listeners = contextListeners.get(Context);

      if (!listeners) {
        return;
      }

      listeners.delete(listenerID.current);

      if (listeners.size === 0) {
        contextListeners.delete(Context);
      }
    };
  }, []);

  let listeners = contextListeners.get(Context);

  if (!listeners) {
    listeners = new Map();

    contextListeners.set(Context, listeners);
  }

  let listener = listeners.get(listenerID.current);

  if (!listener) {
    listener = {
      getterFn,
      forceUpdate,
    };
    listeners.set(listenerID.current, listener);
  }

  return currentSelection;
}

export { createContext, useContextSelection };
