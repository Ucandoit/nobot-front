import { useCallback, useEffect, useState } from 'react';

const useAsyncFunction = <T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  defaultValue: T,
  ...params: any[]
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
    asyncFunction
      .apply(null, params)
      .then(val => setState({ value: val, isPending: false, error: null }))
      .catch(err =>
        setState({
          value: defaultValue,
          isPending: false,
          error: err.toString()
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asyncFunction, defaultValue, JSON.stringify(params)]);

  useEffect(() => {
    callFunction();
  }, [callFunction]);

  const { value, isPending, error } = state;
  return [value, isPending, error, callFunction];
};

export default useAsyncFunction;
