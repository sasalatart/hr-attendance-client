import { useCallback, useReducer } from 'react';
import keymirror from 'keymirror';

const INITIAL_STATE = { creating: false, editing: null, removing: null };

const TYPES = keymirror({
  create: null,
  edit: null,
  remove: null,
  reset: null,
});

function resourceManagerReducer(state, { type, resource }) {
  switch (type) {
    case TYPES.create:
      return { ...INITIAL_STATE, creating: true };
    case TYPES.edit:
      return { ...INITIAL_STATE, editing: resource };
    case TYPES.remove:
      return { ...INITIAL_STATE, removing: resource };
    case TYPES.reset:
      return INITIAL_STATE;
    default:
      throw new Error(`Action ${type} not defined for resourceManagerReducer`);
  }
}

export default function useResourceManager() {
  const [state, dispatch] = useReducer(resourceManagerReducer, INITIAL_STATE);

  const setCreating = useCallback(() => dispatch({ type: TYPES.create }), [
    dispatch,
  ]);

  const setEditingResource = useCallback(
    resource => dispatch({ type: TYPES.edit, resource }),
    [dispatch],
  );

  const setRemovingResource = useCallback(
    resource => dispatch({ type: TYPES.remove, resource }),
    [dispatch],
  );

  const resetManager = useCallback(() => dispatch({ type: 'reset' }), [
    dispatch,
  ]);

  return {
    state,
    dispatch,
    setCreating,
    setEditingResource,
    setRemovingResource,
    resetManager,
  };
}
