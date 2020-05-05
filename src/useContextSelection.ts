import React from 'react';

import { contextListeners, contextConsumerTypeSymbol } from './globals';

function useContextSelection<T = any>(Context: React.Context<T>, selection: Selector<T>): any {
  if (process.env.NODE_ENV !== 'production') {
    // @ts-ignore
    if (Context.Consumer.$$type !== contextConsumerTypeSymbol) {
      throw new Error(
        `You need to provide a 'Context' instance created with 'createContext()' function from 'use-context-selection' library.`
      );
    }
  }

  const contextValue = React.useContext(Context);
  const [currentSelection, forceUpdate] = React.useState<any>(() => selection(contextValue));
  const listener = React.useRef({ selection, forceUpdate });

  React.useEffect(() => {
    const listeners = contextListeners.get(Context)!;

    listeners.add(listener.current);

    return () => {
      const listeners = contextListeners.get(Context)!;

      listeners.delete(listener.current);
    };
  }, []);

  return currentSelection;
}

export default useContextSelection;
