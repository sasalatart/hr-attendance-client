import toastr from 'toastr';
import get from 'lodash/get';
import { PROMISE_TYPES_SUFFIXES } from '../ducks/common';
import { logOut, getIsLoggedIn } from '../ducks/sessions';

export default store => next => action => {
  if (
    !action.type.includes(PROMISE_TYPES_SUFFIXES.REJECTED) ||
    !get(action.payload, 'status')
  ) {
    return next(action);
  }

  const { status, error } = action.payload;

  if (status === 401 || status === 403) {
    const loggedIn = getIsLoggedIn(store.getState());
    if (loggedIn) store.dispatch(logOut());
    toastr[status === 403 ? 'error' : 'warning'](error);
  } else {
    toastr.error(error);
  }

  return next(action);
};
