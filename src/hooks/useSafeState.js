import { useCallback, useEffect, useRef, useState } from 'react';

export default function useSafeState(initialState) {
  const [state, setState] = useState(initialState);
  const isSafe = useRef(false);

  useEffect(() => {
    isSafe.current = true;
    return () => {
      isSafe.current = false;
    };
  }, []);

  const handleSetState = useCallback(
    (...args) => isSafe.current && setState(...args),
    [setState],
  );

  return [state, handleSetState];
}
