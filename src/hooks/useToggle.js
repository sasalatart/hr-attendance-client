import { useCallback } from 'react';
import useSafeState from './useSafeState';

export default function useToggle(initialValue = false) {
  const [value, setValue] = useSafeState(initialValue);
  const handleToggleValue = useCallback(
    () => setValue(prevValue => !prevValue),
    [setValue],
  );
  return [value, handleToggleValue];
}
