import React from 'react';

import isEqualShallow from './isEqualShallow';
import createContextConsumer from './createContextConsumer';
import { contextListeners } from './globals';

function createContextDispatcher<T>(
  listeners: Set<ContextListener<T>>,
  equalityFn: EqualityFn<T> = isEqualShallow
): ContextComparator<T> {
  return (oldValue: T, newValue: T): 0 => {
    for (const listener of listeners) {
      const newResult = listener.selection(newValue);

      if (!equalityFn(newResult, listener.selection(oldValue))) {
        listener.forceUpdate(newResult);
      }
    }

    return 0;
  };
}

function createContext<T>(initValue: T, equalityFn?: EqualityFn<T>): CustomContext<T> {
  const listeners = new Set<ContextListener<T>>();

  // @ts-ignore
  const Context = React.createContext<T>(initValue, createContextDispatcher<T>(listeners, equalityFn));

  contextListeners.set(Context, listeners);

  // @ts-ignore
  Context.Consumer = createContextConsumer(Context);

  return Context as CustomContext<T>;
}

export default createContext;
export { createContextDispatcher };
