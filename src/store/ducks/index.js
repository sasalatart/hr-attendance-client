import { combineReducers } from 'redux';
import entities from './entities';
import sessions, { TYPES as SESSIONS_TYPES } from './sessions';

const appReducer = combineReducers({
  entities,
  sessions,
});

export default function rootReducer(state, action) {
  return appReducer(
    action.type === SESSIONS_TYPES.LOG_OUT ? undefined : state,
    action,
  );
}
