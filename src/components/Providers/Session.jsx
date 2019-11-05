import React, { createContext, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut, getIsLoggedIn } from '../../store/ducks/sessions';

export const SessionContext = createContext();

export default function SessionProvider({ children }) {
  const dispatch = useDispatch();
  const loggedIn = useSelector(getIsLoggedIn);
  const handleLogOut = useCallback(() => dispatch(logOut()), [dispatch]);

  const value = useMemo(() => {
    return { loggedIn, logOut: handleLogOut };
  }, [handleLogOut, loggedIn]);

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
