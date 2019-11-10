import React, { createContext, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import camelCase from 'lodash/camelCase';
import get from 'lodash/get';
import { roles } from '../../constants';
import {
  logOut,
  getCurrentUser,
  getIsLoggedIn,
} from '../../store/ducks/sessions';

export const SessionContext = createContext();

export default function SessionProvider({ children }) {
  const dispatch = useDispatch();
  const loggedIn = useSelector(getIsLoggedIn);
  const currentUser = useSelector(getCurrentUser);
  const handleLogOut = useCallback(() => dispatch(logOut()), [dispatch]);

  const value = useMemo(() => {
    const role = camelCase(get(currentUser, 'role'));
    return {
      currentUser,
      loggedIn,
      logOut: handleLogOut,
      isEmployee: role === roles.employee,
      isOrgAdmin: role === roles.orgAdmin,
      isAdmin: role === roles.admin,
    };
  }, [currentUser, handleLogOut, loggedIn]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

SessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};
