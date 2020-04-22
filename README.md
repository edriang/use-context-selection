# use-context-selection

<!-- TOC -->

- [use-context-selection](#use-context-selection)
    - [Install](#install)
    - [What?](#what)
    - [Why?](#why)
    - [How?](#how)
    - [Usage](#usage)
    - [Demo App](#demo-app)
    - [API](#api)
        - [createContext](#createcontext)
        - [useContextSelection](#usecontextselection)
        - [isEqualShallow](#isequalshallow)
    - [Related projects](#related-projects)
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


## API

### createContext

Creates a smart `Context` object which compares changes on your Context state and dispatches changes to subscribers.

| Param | Type | Description | Optional / Required |
|-------|-------------|-------------|---------------|
| initValue | any | Initial value for the Context | Required |
| equalityFn | Function | Function used to compare old vs new state; by default it performs shallow equality check | Optional |

- **Return Value**: Context

### useContextSelection

Hook to access your Context state; receives a `Context` object created with `createContext` function and a `selection` function.

This Hook will trigger a re-render on your component every-time these conditions are met:
- The state on your `Context` changes
- The `selection` function returns a different value since the last time it rendered

| Param | Type | Description | Optional / Required |
|-------|-------------|-------------|---------------|
| Context | Context | Context created with `createContext` function from this library | Required |
| selection | Function | Use this selection function to retrieve data from your Context; receives the current state / value and should return whatever your component needs | Required |

- **Return Value**: any; whatever you are returning on `selection` function.

### isEqualShallow

This is the default comparator function used internally if `equalityFn` param is not provided to `createContext`.

This function is exported as part of the library in case you need it as foundations for your own equality check function.

You need to remember two things about this default equality function:
- As the name already implies, it performs a **shallow** equality check for performance reassons;
- It will ignore comparing `functions`; this comes handy as you'd probably include in your store functions to mutate the current state; this way there is no need to memoize the functions (e.g. using `React.useCallback`).

| Param | Type | Description | Optional / Required |
|-------|-------------|-------------|---------------|
| newState | any | New state to compare with | Required |
| oldState | any | Old state to compare with | Required |

- **Return Value**: boolean; whether both states are considered the same or not.

## Related projects

This library is used internally by [react-connect-context-hooks](https://www.npmjs.com/package/react-connect-context-hooks), a library for easily managing application-state.

## Disclaimer

This library was inspired by [use-context-selector](https://www.npmjs.com/package/use-context-selector), but here are some key differences:
- `use-context-selection` allows you to specify a custom `equality-check` function.
- Internally, `use-context-selection` manages different set of listeners per Context, while `use-context-selector` stores all listeners (even for different Contexts) within a single shared Set.
- `use-context-selection` allows you to use an enhanced version of `Context.Consumer` component, which supports `selection` functions like `useContextSelection` hook.
- `use-context-selector` [executes different logic](https://github.com/dai-shi/use-context-selector/blob/3f1df8f818176db835dc894fff191e9a4d2f8a68/src/index.js#L9) when running in `production` mode than while in `development`. In production mode it'll trigger updates on listener components during the `render` phase; this behavior is something React would complain about with some scary warning messages on the console if it runs on `development` mode.

That being said, based on some internal testing, both libraries are seamlessly performant.

## License

MIT © [edriang](https://github.com/edriang)
