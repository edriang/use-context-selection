import React from 'react';
import { render } from '@testing-library/react';

import { contextConsumerTypeSymbol } from './globals';
import createContextConsumer from './createContextConsumer';
import createContext from './createContext';

describe('createContextConsumer', () => {
  it('creates custom Context.Consumer', () => {
    const typeProp = '$$type';
    const Context = createContext({});
    const Consumer = createContextConsumer(Context);

    expect(Consumer[typeProp]).toBe(contextConsumerTypeSymbol);
  });

  it('access to selected values from Consumer', () => {
    const state = {
      a: 'A',
      b: 'B',
    };
    const Context = createContext(state);
    const Component = () => (
      <Context.Provider value={state}>
        <Context.Consumer selection={(state) => state.a}>{(a) => a}</Context.Consumer>
      </Context.Provider>
    );
    const { getByText } = render(<Component />);

    expect(getByText(state.a)).toBeTruthy();
  });
});

export default createContextConsumer;
