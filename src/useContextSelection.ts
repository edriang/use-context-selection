import React from 'react';

import isEqualShallow from './isShallowEqual';

let LISTENER_UID = 1;
const COMMON_ERROR = `An error occurred while processing 'useContextSelection' hook; check the following:
- You've wrapped your application code with the 'Context.Provider'.
- Your getter function doesn't throw errors.`;

type GetterFn = (state: any) => any;
type Listener = {
  getterFn: GetterFn;
  forceUpdate: Function;
};
type ContextListeners = Map<number, Listener>;

const contextListeners = new Map<React.Context<any>, ContextListeners>();

function createContextConsumer<T>(Context: React.Context<T>) {
  function ContextSelectionConsumer({ children, selector = (store: any) => store }: any) {
    const contextValue = useContextSelection(Context, selector);

    return children(contextValue);
  }

  return ContextSelectionConsumer;
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
  if (Context.Consumer.name !== 'ContextSelectionConsumer') {
    throw new Error(
      `You need to provide a 'Context' instance created with 'createContext()' function from 'use-context-selection' library.`
    );
  }

  const listenerID = React.useRef(LISTENER_UID++);
  const contextValue = React.useContext(Context);
  let currentSelection;
  let forceUpdate;

  try {
    [currentSelection, forceUpdate] = React.useState<any>(getterFn(contextValue));
  } catch (e) {
    throw new Error(`${COMMON_ERROR}\nAdditional error details: ${e.message}`);
  }

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
