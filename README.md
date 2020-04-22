# use-context-selection

<!-- TOC -->

- [use-context-selection](#use-context-selection)
    - [Install](#install)
    - [What?](#what)
    - [Why?](#why)
    - [How?](#how)
    - [Usage](#usage)
    - [Demo App](#demo-app)
    - [Disclaimer](#disclaimer)
    - [License](#license)

<!-- /TOC -->

## Install

```bash
npm install --save use-context-selection
```

## What?

`use-context-selection` allows your components to select partial data from Context and receive updates only when that part of your Context value changes.

## Why?

By using `useContext` hook your components subscribes to the entire Context value and will receive updates anytime one of the values in the store changes.

As an example, let's suppose you have data `a`, `b` and `c` stored in your context, and 3 components `A`, `B` and `C` which respectively access that data. Then, suppose that `a` value in the Context is modified; this will trigger a re-render on the tree components (`A`, `B` and `C`).

This might not be an issue if your application only connects to the Context from a small number of components, but things can get slowish for other applications which connect a lot of components with the store.

To overcome this issue, `useContextSelection` let you subscribe to any piece of data on your Context and dispatch updates to your components only when it's related data changes! This means, in the example above, changes on `a` will result in ONLY component `A` to be re-rendered.

## How?

This library makes use of a non-documented feature available on `React.createContext` API which allows us to disable dispatching updates to every component accessing a Context value. Then, thanks to hooks, we can dispatch updates specifically to the components listening for some changes.

When `useContextSelection` is used on a component it will register this component as a listener of the Context; then, when a Context value is updated it will detect the changed data and dispatch an update to the components listening for the specific piece of data.

`useContextSelection` receives a getter function as argument to get whatever you want from the Context; e.g.:

```javascript
// Let's suppose this is the current state of your Context data
const state = {
  a: 'A value',
  b: 'B value',
  c: 'B value',
}

// Then, in component `A` you can select (and listen) only `a` value
const a = useContextSelection(state => state.a);
```

And that's it! Now, every time `state.a` changes then component `A` will get re-rendered.

NOTE: you can return anything on your getter function, so for example this is also valid:
```javascript
const { a, b } = useContextSelection(state => ({ a: state.a, b: state.b });
```

or even this:
```javascript
const [ a, b ] = useContextSelection(state => [state.a, state.b]);
```

## Usage

First, you need to create a new `Context` using the `createContext` function included in this library (using `React.createContext` will throw an error).

```javascript
import { createContext, useContextSelection } from 'use-context-selection';

const AuthContext = createContext({});
```

Then, you can use `Context` as you would normally do on your application; here is just an example but you can implement your provider as you want (e.g. using `React.useReducer`):

```javascript
const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  function loginFn(username) {
    setIsLoading(true);

    setTimeout(() => {
      setUser({ username });
      setIsLoading(false);
    }, 1000);
  }
  
  const contextValue = {
    user,
    loginFn,
    isLoading,
    isAuthenticated: Boolean(user),
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
```

Now, from you component you can listen for specific parts of the state:

```javascript
const AppContent = () => {
  const { isLoading, loginFn } = useContextSelection(AuthContext, state => ({
    isLoading: state.isLoading,
    loginFn: state.loginFn,
  }));

  if (isLoading) {
    return 'Loading...';
  }
  return <LoginForm loginFn={loginFn} />;
}
```

Finally, remember to wrap your application with the Provider.

```javascript
export default App = () => {
  <AuthProvider>
    <AppContent />
  </AuthProvider>
}
```


Or you can also use a selection function using `Context.Consumer` component in this way:

```javascript
const App = () => (
  <AuthProvider>
    <AuthContext.Consumer selection={state => ({ isLoading: state.isLoading, loginFn: state.loginFn })}>
      {({ isLoading, loginFn }) => {
        if (isLoading) {
          return 'Loading...';
        }
        return <LoginForm loginFn={loginFn} />;
      }}
    </AuthContext.Consumer>
  </AuthProvider>
);
```

## Demo App

Check performance comparison against `useContext` hook on the following app-example:
[https://edriang.github.io/use-context-selection/](https://edriang.github.io/use-context-selection/)


## Disclaimer

This library was inspired by [use-context-selector](https://www.npmjs.com/package/use-context-selector).

This library is used internally by [react-connect-context-hooks](https://www.npmjs.com/package/react-connect-context-hooks), a library for easily managing application-state.


## License

MIT © [edriang](https://github.com/edriang)
