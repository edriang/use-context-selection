import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import useContextSelection from './useContextSelection';
import createContext from './createContext';
import { contextListeners } from './globals';

jest.mock('./globals', () => ({
  contextListeners: new Map(),
}));

describe('createContextConsumer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    contextListeners.clear();
  });

  it('throws an error if provided Context was not created using this library', () => {
    const Context = React.createContext({});

    expect(() => useContextSelection(Context, () => {})).toThrow();
  });

  it('adds a listener to contextListeners Map', () => {
    const state = {};
    createContext(state);

    expect(contextListeners?.size).toBe(1);
  });

  it('returns selected state', () => {
    const state = { a: 'A', b: 'B' };
    const Context = createContext(state);
    const selection = (state: any) => state.a;
    const { result } = renderHook(() => useContextSelection(Context, selection));

    expect(result.current).toBe(state.a);
  });

  it('adds listeners when executed useContextSelection on new mounted component', () => {
    const Context = createContext({});
    renderHook(() => useContextSelection(Context, () => {}));
    renderHook(() => useContextSelection(Context, () => {}));

    expect(contextListeners.get(Context)?.size).toBe(2);
  });

  it('removes listeners and whole Set after components unmounts', () => {
    const Context = createContext({});
    const { unmount: unmount1 } = renderHook(() => useContextSelection(Context, () => {}));
    const { unmount: unmount2 } = renderHook(() => useContextSelection(Context, () => {}));

    unmount1();
    unmount2();

    expect(contextListeners.get(Context)?.size).toBe(0);
  });
});
