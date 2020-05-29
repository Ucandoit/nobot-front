import { useEffect, useState } from 'react';

const useAsyncFunction = <T>(asyncFunction: () => Promise<T>, defaultValue: T): [T, boolean, string | null] => {
  const [state, setState] = useState({
    value: defaultValue,
    isPending: true,
    error: null
  });

  useEffect(() => {
    asyncFunction()
      .then(value => setState({ value, isPending: false, error: null }))
      .catch(error =>
        setState({
          value: defaultValue,
          isPending: false,
          error: error.toString()
        })
      );
  }, [asyncFunction, defaultValue]);

  const { value, isPending, error } = state;
  return [value, isPending, error];
};

export default useAsyncFunction;
