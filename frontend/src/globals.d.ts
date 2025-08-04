declare namespace React {
  function createElement(...args: any[]): any;
  function useState<T>(initial: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void];
  function useEffect(effect: () => void, deps?: any[]): void;
}

declare namespace ReactDOM {
  function render(element: any, container: any): void;
}
