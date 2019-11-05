import { useEffect } from 'react';
import useSafeState from './useSafeState';

export default function useLoadResource(loadResource, background = false) {
  const [loading, setLoading] = useSafeState(!background);

  useEffect(() => {
    setLoading(true);
    loadResource().finally(() => setLoading(false));
  }, [loadResource, setLoading]);

  return loading && !background;
}
