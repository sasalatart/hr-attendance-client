import { useCallback } from 'react';
import useToggle from './useToggle';

export default function useActOnResource(actOnResource) {
  const [loading, toggleLoading] = useToggle(false);
  const handleActOnResource = useCallback(() => {
    toggleLoading();
    return actOnResource()
      .then(toggleLoading)
      .catch(toggleLoading);
  }, [actOnResource, toggleLoading]);

  return [loading, handleActOnResource];
}
