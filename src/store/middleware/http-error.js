import { toast } from 'react-toastify';
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
    !get(action.payload, 'httpStatus')
  ) {
    return next(action);
  }

  const { httpStatus, message, errors } = action.payload;
  if (httpStatus === 401) {
    const loggedIn = getIsLoggedIn(store.getState());
    if (loggedIn) store.dispatch(logOut());

    toast.warn(loggedIn ? i18n.t('errors.tokenExpired') : message);
  } else {
    toast.error(httpStatus === 422 ? validationDescription(errors) : message);
  }

  return next(action);
};
