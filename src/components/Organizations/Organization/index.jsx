import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import {
  loadOrganization,
  getOrganizationEntity,
} from '../../../store/ducks/organizations';
import { DataPlaceholder, Title } from '../../Common';
import { useLoadResource } from '../../../hooks';

export default function Organization() {
  const dispatch = useDispatch();
  const {
    params: { organizationId },
  } = useRouteMatch();

  const organization = useSelector(state =>
    getOrganizationEntity(state, { organizationId }),
  );
  const loading = useLoadResource(
    useCallback(() => dispatch(loadOrganization(organizationId)), [
      dispatch,
      organizationId,
    ]),
    !!organization,
  );

  return (
    <DataPlaceholder loading={loading} resource={organization}>
      {() => (
        <>
          <Title text={organization.name} withBackButton />
        </>
      )}
    </DataPlaceholder>
  );
}
