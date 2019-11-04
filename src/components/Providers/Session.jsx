import React, { createContext, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut, getIsLoggedIn } from '../../store/ducks/sessions';

export const SessionContext = createContext();

function SessionProvider({ loggedIn, onLogOut, children }) {
  const value = useMemo(() => {
    return { loggedIn, logOut: onLogOut };
  }, [loggedIn, onLogOut]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

SessionProvider.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  onLogOut: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

function mapStateToProps(state) {
  return {
    loggedIn: getIsLoggedIn(state),
  };
}

const mapDispatchToProps = { onLogOut: logOut };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionProvider);
