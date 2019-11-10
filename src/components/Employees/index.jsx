import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../../routes';
import Attendances from './Attendances';
import Registry from './Registry';

export default function Organizations() {
  return (
    <Switch>
      <Route path={routes.employeesRegistry} component={Registry} />
      <Route path={routes.employeesAttendances} component={Attendances} />
      <Route component={Attendances} />
    </Switch>
  );
}
