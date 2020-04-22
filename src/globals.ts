const contextConsumerTypeSymbol = Symbol('ContextSelectionConsumer');

const contextListeners = new Map<React.Context<any>, Set<ContextListener<any>>>();

export { contextListeners, contextConsumerTypeSymbol };
