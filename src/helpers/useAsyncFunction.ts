import { useCallback, useEffect, useState } from 'react';

const useAsyncFunction = <T>(
  asyncFunction: () => Promise<T>,
  defaultValue: T
): [T, boolean, string | null, () => void] => {
  const [state, setState] = useState({
    value: defaultValue,
    isPending: true,
    error: null
  });

  const callFunction = useCallback(() => {
    setState(prev => ({
      ...prev,
      isPending: true
    }));
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

  useEffect(() => {
    callFunction();
  }, [callFunction]);

  const { value, isPending, error } = state;
  return [value, isPending, error, callFunction];
};

export default useAsyncFunction;
