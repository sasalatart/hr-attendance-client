import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Organization from './Organization';
import OrganizationsList from './List';
import routes from '../../routes';

export default function Organizations() {
  return (
    <Switch>
      <Route path={routes.organizationsOrganization} component={Organization} />
      <Route component={OrganizationsList} />
    </Switch>
  );
}
