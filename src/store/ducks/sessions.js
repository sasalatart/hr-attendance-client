import { batch } from 'react-redux';
import { Map } from 'immutable';
import { normalize, denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import API from '../../api';
import { clearToken, setToken } from '../../lib/sessions';
import { userSchema } from '../schemas';
import { generateTypes, generatePromiseTypes } from './common';
import { getEntities } from './entities';

const INITIAL_STATE = new Map({
  currentUserId: undefined,
  token: undefined,
});

export const TYPES = generateTypes('sessions', [
  'REHYDRATE',
  'LOG_IN',
  'LOAD_PROFILE',
  'LOG_OUT',
]);

export const PROMISE_TYPES = generatePromiseTypes(Object.values(TYPES));

export default function sessionsReducer(
  state = INITIAL_STATE,
  { type, payload },
) {
  switch (type) {
    case TYPES.REHYDRATE: {
      const { jwt } = payload;
      if (!jwt) return state;

      setToken(jwt);
      return state.set('token', jwt);
    }
    case PROMISE_TYPES.LOG_IN.FULFILLED:
      return state.merge({ token: payload.jwt });
    case PROMISE_TYPES.LOAD_PROFILE.FULFILLED:
      return state.set('currentUserId', payload.result);
    default:
      return state;
  }
}

export function loadProfile() {
  return {
    type: TYPES.LOAD_PROFILE,
    payload: API.loadProfile().then(profile => normalize(profile, userSchema)),
  };
}

export function logIn(body) {
  return dispatch =>
    batch(async () => {
      const {
        value: { jwt },
      } = await dispatch({
        type: TYPES.LOG_IN,
        payload: API.logIn({ auth: body }),
      });
      setToken(jwt);
      return dispatch(loadProfile());
    });
}

export function logOut() {
  clearToken();
  return { type: TYPES.LOG_OUT };
}

export const getSessionsState = state => state.sessions;

export const getCurrentUserId = createSelector(
  getSessionsState,
  sessionsState => sessionsState.get('currentUserId'),
);

export const getCurrentUser = createSelector(
  getCurrentUserId,
  getEntities,
  (currentUserId, entities) => denormalize(currentUserId, userSchema, entities),
);

export const getIsLoggedIn = createSelector(
  getSessionsState,
  sessionsState => !!sessionsState.get('token'),
);
