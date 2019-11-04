import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { getToken } from '../lib/sessions';
import root from './ducks';
import { TYPES as SESSIONS_TYPES } from './ducks/sessions';
import httpErrorMiddleware from './middleware/http-error';

let store;

// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunkMiddleware, promiseMiddleware, httpErrorMiddleware];

export default () => {
  if (store) return { store };

  store = createStore(root, composeEnhancer(applyMiddleware(...middleware)));
  store.dispatch({
    type: SESSIONS_TYPES.REHYDRATE,
    payload: { jwt: getToken() },
  });
  return { store };
};
