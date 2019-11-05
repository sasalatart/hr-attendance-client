import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useLoadResource, useSession } from '../hooks';
import { loadProfile } from '../store/ducks/sessions';
import { Background, DataPlaceholder } from './Common';

const dummyPromise = () => Promise.resolve();

/**
 * We need to load the profile when starting the app and we only have a JWT.
 * This means there is a short moment in which we have a valid JWT, but no profile in store.
 */
export default function Startup({ children }) {
  const dispatch = useDispatch();
  const { loggedIn, currentUser } = useSession();

  const handleLoadProfile = useCallback(() => dispatch(loadProfile()), [
    dispatch,
  ]);

  const loading = useLoadResource(
    loggedIn ? handleLoadProfile : dummyPromise,
    !!currentUser,
  );

  return (
    <Background centered={!currentUser}>
      <DataPlaceholder
        loading={loading}
        resource={loggedIn ? currentUser : null}
      >
        {children}
      </DataPlaceholder>
    </Background>
  );
}

Startup.propTypes = {
  children: PropTypes.node.isRequired,
};
