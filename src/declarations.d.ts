type Selector<T> = (state: T) => any;
type ContextListener<T> = {
  selection: Selector;
  forceUpdate: Function;
};
type ContextConsumerProps<T> = React.ConsumerProps<T> & {
  selection: Selector<T>;
};
type ContextConsumer<T> = React.FC<ContextConsumerProps<T>> & {
  $$type: Symbol;
};
type CustomContext<T> = React.Context<T> & {
  Consumer: ContextConsumer<T>;
};
type ContextComparator<T> = (oldValue: T, newValue: T) => 0;
