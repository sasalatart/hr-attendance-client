import toastr from 'toastr';
import get from 'lodash/get';
import i18n from '../../locales';
import { PROMISE_TYPES_SUFFIXES } from '../ducks/common';
import { logOut, getIsLoggedIn } from '../ducks/sessions';

// TODO: Create a parser for API validation errors
// eslint-disable-next-line no-unused-vars
function validationDescription(errors) {
  return i18n.t('errors.validationPlaceholder');
}

export default store => next => action => {
  if (
    !action.type.includes(PROMISE_TYPES_SUFFIXES.REJECTED) ||
    !get(action.payload, 'status')
  ) {
    return next(action);
  }

  const { status, error, errors } = action.payload;
  if (status === 401) {
    const loggedIn = getIsLoggedIn(store.getState());
    if (loggedIn) store.dispatch(logOut());

    toastr.warning(loggedIn ? i18n.t('errors.tokenExpired') : error);
  } else {
    toastr.error(status === 422 ? validationDescription(errors) : error);
  }

  return next(action);
};
