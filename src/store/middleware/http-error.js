import toastr from 'toastr';
import get from 'lodash/get';
import i18n from '../../locales';
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
  if (status === 401) {
    const loggedIn = getIsLoggedIn(store.getState());
    if (loggedIn) store.dispatch(logOut());
    toastr.warning(loggedIn ? i18n.t('errors.tokenExpired') : error);
  } else {
    toastr.error(error);
  }

  return next(action);
};
