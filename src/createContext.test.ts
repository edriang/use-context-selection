import createContext, { createContextDispatcher } from './createContext';
import { contextListeners, contextConsumerTypeSymbol } from './globals';

jest.mock('./globals', () => ({
  contextConsumerTypeSymbol: Symbol('CustomConsumer'),
  contextListeners: new Map(),
}));

describe('createContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    contextListeners.clear();
  });

  it('creates new context and returns custom Context Object', () => {
    const Context = createContext({});
    const typeProp = '$$type';

    expect(Context.Consumer[typeProp]).toBe(contextConsumerTypeSymbol);
  });

  it('creates new empty set for listeners associated with current Context', () => {
    const Context = createContext({});

    expect(contextListeners.size).toBe(1);
    expect(contextListeners.has(Context)).toBeTruthy();
    expect(contextListeners.get(Context)!.size).toBe(0);
  });
});

describe('createContextDispatcher', () => {
  it('creates comparator function', () => {
    const comparator = createContextDispatcher(new Set());

    expect(typeof comparator).toBe('function');
  });

  it('comparator function returns always 0', () => {
    const comparator = createContextDispatcher(new Set());

    expect(comparator({}, {})).toBe(0);
  });

  it('dispatch changes to every listeners if new state is different', () => {
    const forceUpdate = jest.fn();
    const state = { a: 'a' };
    const newState = { a: 'A' };
    const listener1: ContextListener<any> = {
      selection: (state: any) => state,
      forceUpdate,
    };
    const listener2: ContextListener<any> = {
      selection: (state: any) => state,
      forceUpdate,
    };
    const comparator = createContextDispatcher(new Set([listener1, listener2]));

    comparator(state, newState);

    expect(forceUpdate).toHaveBeenCalledTimes(2);
    expect(forceUpdate).toHaveBeenNthCalledWith(1, newState);
    expect(forceUpdate).toHaveBeenNthCalledWith(2, newState);
  });

  it('dispatches to listeners only what getter returned', () => {
    const forceUpdate = jest.fn();
    const state = { a: 'a', b: 'b' };
    const newState = { a: 'A', b: 'B' };
    const listener1: ContextListener<any> = {
      selection: (state: any) => state.a,
      forceUpdate,
    };
    const comparator = createContextDispatcher(new Set([listener1]));

    comparator(state, newState);

    expect(forceUpdate).toHaveBeenNthCalledWith(1, newState.a);
  });

  it('does not dispatch if state changed but we are not interested on that part', () => {
    const forceUpdate = jest.fn();
    const state = { a: 'a', b: 'b' };
    const newState = { a: 'a', b: 'B' };
    const listener1: ContextListener<any> = {
      selection: (state: any) => state.a,
      forceUpdate,
    };
    const comparator = createContextDispatcher(new Set([listener1]));

    comparator(state, newState);

    expect(forceUpdate).toHaveBeenCalledTimes(0);
  });

  it('does not dispatch if nothing changed', () => {
    const forceUpdate = jest.fn();
    const state = { a: 'a', b: 'b' };
    const newState = { a: 'a', b: 'b' };
    const listener1: ContextListener<any> = {
      selection: (state: any) => state,
      forceUpdate,
    };
    const comparator = createContextDispatcher(new Set([listener1]));

    comparator(state, newState);

    expect(forceUpdate).toHaveBeenCalledTimes(0);
  });
});
