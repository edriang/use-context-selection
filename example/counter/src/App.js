import React from 'react'

import { createContext, useContextSelection } from 'use-context-selection'

const Context = createContext({});

const CounterProvider = ({ children }) => {

  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + 1 };
      case 'INCREMENT2':
        return { ...state, count2: state.count2 + 1 };
      default:
        return state;
    }
  }, {
    count: 0,
    count2: 999,
  });

  const increment = () => dispatch({ type: 'INCREMENT' });
  const increment2 = () => dispatch({ type: 'INCREMENT2' });

  const value = { ...state, increment, increment2 };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

const Counter1 = () => {
  console.log('Counter 1');

  const { count, increment } = useContextSelection(Context, function getter1(state) {
    return {
      count: state.count,
      increment: state.increment,
    }
  });

  return (
    <div>
      Count 1: <span>{count}</span>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

const Counter2 = () => {
  console.log('Counter 2');

  const { count2, increment2 } = useContextSelection(Context, function getter2(state) {
    return {
      count2: state.count2,
      increment2: state.increment2,
    }
  });

  return (
    <div>
      Count 2: <span>{count2}</span>
      <button onClick={increment2}>Increment</button>
    </div>
  )
}


const App = () => {
  return (
    <CounterProvider>
      <Counter1 />
      <Counter2 />
    </CounterProvider>
  )
}

export default App
