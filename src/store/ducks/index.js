import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import entities from './entities';
import organizations from './organizations';
import sessions, { TYPES as SESSIONS_TYPES } from './sessions';

const appReducer = history => {
  return combineReducers({
    entities,
    organizations,
    router: connectRouter(history),
    sessions,
  });
};

export default function createRootReducer(history) {
  const rootReducer = appReducer(history);
  return (state, action) => {
    return rootReducer(
      action.type === SESSIONS_TYPES.LOG_OUT ? undefined : state,
      action,
    );
  };
}
