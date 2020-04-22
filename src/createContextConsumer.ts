import { contextConsumerTypeSymbol } from './globals';
import useContextSelection from './useContextSelection';

function createContextConsumer<T>(Context: React.Context<T>): ContextConsumer<T> {
  const ContextSelectionConsumer: ContextConsumer<T> = ({ children, selection = (store: any) => store }: any) => {
    const contextValue = useContextSelection(Context, selection);

    return children(contextValue);
  };

  ContextSelectionConsumer.$$type = contextConsumerTypeSymbol;

  return ContextSelectionConsumer;
}

export default createContextConsumer;
